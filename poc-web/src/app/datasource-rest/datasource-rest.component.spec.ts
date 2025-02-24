import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceRestComponent } from './datasource-rest.component';

describe('DatasourceRestComponent', () => {
  let component: DatasourceRestComponent;
  let fixture: ComponentFixture<DatasourceRestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatasourceRestComponent]
    });
    fixture = TestBed.createComponent(DatasourceRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
