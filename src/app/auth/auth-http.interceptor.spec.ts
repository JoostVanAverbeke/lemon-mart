import { TestBed } from '@angular/core/testing';

import { AuthHttpInterceptor } from './auth-http.interceptor';
import { AuthService} from './auth.service';
import { InMemoryAuthService } from './in-memory-auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../app-routing.module';

describe('AuthHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule.withRoutes(appRoutes),
    ],
    providers: [
      AuthHttpInterceptor,
      { provide: AuthService, useClass: InMemoryAuthService },
    ],
  }));

  it('should be created', () => {
    const interceptor: AuthHttpInterceptor = TestBed.inject(AuthHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
