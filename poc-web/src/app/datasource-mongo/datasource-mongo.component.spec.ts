import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceMongoComponent } from './datasource-mongo.component';

describe('DatasourceMongoComponent', () => {
  let component: DatasourceMongoComponent;
  let fixture: ComponentFixture<DatasourceMongoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatasourceMongoComponent]
    });
    fixture = TestBed.createComponent(DatasourceMongoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
