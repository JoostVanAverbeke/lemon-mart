import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, throwError } from 'rxjs';
import { catchError, filter, map, mergeMap, tap} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { transformError } from '../common/common';
import { IUser } from '../user/user/iuser';
import { User } from '../user/user/user';
import { Role } from './auth.enum';
import { CacheService } from './cache.service';
import { IAuthStatus } from './iauth-status';
import { IAuthService } from './iauth-service';
import { IServerAuthResponse } from './iserver-auth-response';

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
};

@Injectable()
export abstract class AuthService extends CacheService implements IAuthService {
  private getAndUpdateUserIfAuthenticated = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    mergeMap(() => this.getCurrentUser()),
    map((user: IUser) => this.currentUser$.next(user)),
    catchError(transformError)
  );

  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);
  readonly currentUser$ = new BehaviorSubject<IUser>(new User());
  protected readonly resumeCurrentUser$ = this.authStatus$.pipe(
    this.getAndUpdateUserIfAuthenticated
  );

  constructor() {
    super();

    if (this.hasExpiredToken()) {
      this.logout(true);
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken());
      // To load user on browser refresh, resume pipeline must activate on the next cycle
      // Which allows for all services to constructed properly
      setTimeout(() => this.resumeCurrentUser$.subscribe(), 0);
    }
  }

  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse>;

  protected abstract transformJwtToken(token: unknown): IAuthStatus;

  protected abstract getCurrentUser(): Observable<User>;

  login(email: string, password: string): Observable<void> {
    this.clearToken();

    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken);
        const token = jwt_decode(value.accessToken);
        return this.transformJwtToken(token);
      }),
      tap((status) => this.authStatus$.next(status)),
      this.getAndUpdateUserIfAuthenticated
    );

    loginResponse$.subscribe({
      error: (err) => {
        this.logout();
        return throwError(err);
      },
    });

    return loginResponse$;
  }

  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken();
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0);
  }

  protected setToken(jwt: string): void {
    this.setItem('jwt', jwt);
  }

  getToken(): string {
    const token: string | null = this.getItem('jwt');
    return ((token != null) ? token : '');
  }

  protected clearToken(): void {
    this.removeItem('jwt');
  }

  protected hasExpiredToken(): boolean {
    const jwt = this.getToken();

    if (jwt) {
      const payload = jwt_decode(jwt) as any;
      return Date.now() >= payload.exp * 1000;
    }

    return true;
  }

  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transformJwtToken(jwt_decode(this.getToken()));
  }
}
