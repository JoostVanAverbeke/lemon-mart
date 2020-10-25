import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  login(): void {
    this.authService.login('manager@test.com', '12345678');
    combineLatest([
        this.authService.authStatus$,
        this.authService.currentUser$
    ])
    .pipe(
      filter(([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''),
      tap(([authStatus, user]) => {
        this.router.navigate(['/manager']);
      })
    ).subscribe();
  }

}
