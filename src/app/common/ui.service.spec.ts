import { TestBed } from '@angular/core/testing';

import { UiService } from './ui.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('UiService', () => {
  let service: UiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        MatDialogModule
      ],
    });
    service = TestBed.inject(UiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
