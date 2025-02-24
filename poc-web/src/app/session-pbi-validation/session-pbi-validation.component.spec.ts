import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionPbiValidationComponent } from './session-pbi-validation.component';

describe('SessionPbiValidationComponent', () => {
  let component: SessionPbiValidationComponent;
  let fixture: ComponentFixture<SessionPbiValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionPbiValidationComponent]
    });
    fixture = TestBed.createComponent(SessionPbiValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
