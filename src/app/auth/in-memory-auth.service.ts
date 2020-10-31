import { Injectable } from '@angular/core';
import { sign } from 'fake-jwt-sign'; // For InMemoryAuthService only
import { Observable, of, throwError } from 'rxjs';

import { User } from '../user/user/user';
import { Role } from './auth.enum';
import { AuthService } from './auth.service';
import { PhoneType } from '../user/user/phone.enum';
import { IServerAuthResponse } from './iserver-auth-response';
import { IAuthStatus } from './iauth-status';

@Injectable()
export class InMemoryAuthService extends AuthService {
  // LemonMart Server User Id: 5da01751da27cc462d265913
  private defaultUser = User.Build({
    _id: '5da01751da27cc462d265913',
    email: 'duluca@gmail.com',
    name: { first: 'Doguhan', last: 'Uluca' },
    picture: 'https://secure.gravatar.com/avatar/7cbaa9afb5ca78d97f3c689f8ce6c985',
    role: Role.Manager,
    dateOfBirth: new Date(1980, 1, 1),
    userStatus: true,
    address: {
      line1: '101 Sesame St.',
      city: 'Bethesda',
      state: 'Maryland',
      zip: '20810',
    },
    level: 2,
    phones: [
      {
        id: 0,
        type: PhoneType.Mobile,
        digits: '5555550717',
      },
    ],
  });

  constructor() {
    super();
    console.warn(
      'You are using the InMemoryAuthService. Do not use this service in production.'
    );
  }

  /**
   * Returns an observable of an IServerAuthResponse, which created by calling the fake-jwt-sign
   * sign function for user that is deduced from the predefined default user but contains,
   * the specified email, which should end with '@test.com'. The user role is of our user is
   * deduced from the email address. If the email address includes 'cashier', the user role is
   * mapped to Role.Cashier, if it includes 'clerk' it is mapped to Role.Clerk, if the email
   * includes 'manager' it is mapped to Role.manager otherwise it is mapped to Role.none.
   * @param email email address of the user that wants to sign in
   * @param password password of the user that wants to sign in.
   */
  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    email = email.toLowerCase();

    if (!email.endsWith('@test.com')) {
      return throwError('Failed to login! Email needs to end with @test.com.');
    }

    const authStatus = {
      isAuthenticated: true,
      userId: this.defaultUser._id,
      userRole: email.includes('cashier')
        ? Role.Cashier
        : email.includes('clerk')
          ? Role.Clerk
          : email.includes('manager')
            ? Role.Manager
            : Role.None,
    } as IAuthStatus;

    this.defaultUser.role = authStatus.userRole;

    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    } as IServerAuthResponse;

    return of(authResponse);
  }

  protected transformJwtToken(token: IAuthStatus): IAuthStatus {
    return token;
  }

  protected getCurrentUser(): Observable<User> {
    return of(this.defaultUser);
  }
}
