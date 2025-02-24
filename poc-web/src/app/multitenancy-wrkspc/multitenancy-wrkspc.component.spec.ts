import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultitenancyWrkspcComponent } from './multitenancy-wrkspc.component';

describe('MultitenancyWrkspcComponent', () => {
  let component: MultitenancyWrkspcComponent;
  let fixture: ComponentFixture<MultitenancyWrkspcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultitenancyWrkspcComponent]
    });
    fixture = TestBed.createComponent(MultitenancyWrkspcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
