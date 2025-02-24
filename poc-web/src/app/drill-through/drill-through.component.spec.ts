import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillThroughComponent } from './drill-through.component';

describe('DrillThroughComponent', () => {
  let component: DrillThroughComponent;
  let fixture: ComponentFixture<DrillThroughComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrillThroughComponent]
    });
    fixture = TestBed.createComponent(DrillThroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
