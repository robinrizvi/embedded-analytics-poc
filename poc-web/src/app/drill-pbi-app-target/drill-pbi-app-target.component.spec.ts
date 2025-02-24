import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillPbiAppTargetComponent } from './drill-pbi-app-target.component';

describe('DrillPbiAppTargetComponent', () => {
  let component: DrillPbiAppTargetComponent;
  let fixture: ComponentFixture<DrillPbiAppTargetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrillPbiAppTargetComponent]
    });
    fixture = TestBed.createComponent(DrillPbiAppTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
