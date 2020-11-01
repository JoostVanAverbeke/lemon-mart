import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { AuthService } from '../../auth/auth.service';
import { InMemoryAuthService } from '../../auth/in-memory-auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../../app-routing.module';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
      ],
      providers: [
        { provide: AuthService, useClass: InMemoryAuthService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
