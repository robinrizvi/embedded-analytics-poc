import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillPbiAppComponent } from './drill-pbi-app.component';

describe('DrillPbiAppComponent', () => {
  let component: DrillPbiAppComponent;
  let fixture: ComponentFixture<DrillPbiAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrillPbiAppComponent]
    });
    fixture = TestBed.createComponent(DrillPbiAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
