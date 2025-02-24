import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillUpDownComponent } from './drill-up-down.component';

describe('DrillUpDownComponent', () => {
  let component: DrillUpDownComponent;
  let fixture: ComponentFixture<DrillUpDownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrillUpDownComponent]
    });
    fixture = TestBed.createComponent(DrillUpDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
