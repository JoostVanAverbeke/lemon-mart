import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { commonTestingModules, DomSanitizerFake, MatIconRegistryFake, MediaObserverFake} from './common/common.testing';
import { MediaObserver } from '@angular/flex-layout';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';
import { InMemoryAuthService } from './auth/in-memory-auth.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        commonTestingModules,
      ],
      providers: commonTestingModules.concat([
        { provide: MediaObserver, useClass: MediaObserverFake },
        { provide: MatIconRegistry, useClass: MatIconRegistryFake },
        { provide: DomSanitizer, useClass: DomSanitizerFake },
        { provide: AuthService, useClass: InMemoryAuthService },
      ]),
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'lemon-mart'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('lemon-mart');
  });

});
