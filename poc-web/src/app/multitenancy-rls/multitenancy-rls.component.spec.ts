import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultitenancyRlsComponent } from './multitenancy-rls.component';

describe('MultitenancyRlsComponent', () => {
  let component: MultitenancyRlsComponent;
  let fixture: ComponentFixture<MultitenancyRlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultitenancyRlsComponent]
    });
    fixture = TestBed.createComponent(MultitenancyRlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
