import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthMode, Role } from '../auth/auth.enum';
import {catchError, filter, tap} from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailValidation, PasswordValidation } from '../common/validations';
import { SubSink } from 'subsink';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  loginForm: FormGroup;
  loginError = '';
  redirectUrl: string;
  roles = Object.keys(Role);
  authMode = environment.authMode;
  AuthMode = AuthMode;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    route: ActivatedRoute,
    // private uiService: UiService
  ) {
    this.subs.sink = route.paramMap.subscribe(
      (params) => (this.redirectUrl = params.get('redirectUrl') ?? '')
    );
  }

  ngOnInit(): void {
    this.authService.logout();
    this.buildLoginForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    });
  }

  async login(submittedForm: FormGroup) {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .pipe(catchError((err) => (this.loginError = err)));

    this.subs.sink = combineLatest([
      this.authService.authStatus$,
      this.authService.currentUser$,
    ])
      .pipe(
        filter(([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''),
        tap(([authStatus, user]) => {
          // this.uiService.showToast(`Welcome ${user.fullName}! Role: ${user.role}`)
          this.router.navigate([
            this.redirectUrl || this.homeRoutePerRole(user.role as Role),
          ]);
        })
      )
      .subscribe();
  }

  private homeRoutePerRole(role: Role): string {
    switch (role) {
      case Role.Cashier:
        return '/pos';
      case Role.Clerk:
        return '/inventory';
      case Role.Manager:
        return '/manager';
      default:
        return '/user/profile';
    }
  }
}
