import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAppValidationComponent } from './session-app-validation.component';

describe('SessionAppValidationComponent', () => {
  let component: SessionAppValidationComponent;
  let fixture: ComponentFixture<SessionAppValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionAppValidationComponent]
    });
    fixture = TestBed.createComponent(SessionAppValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
