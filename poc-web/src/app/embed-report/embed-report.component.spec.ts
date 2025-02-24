import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedReportComponent } from './embed-report.component';

describe('EmbedReportComponent', () => {
  let component: EmbedReportComponent;
  let fixture: ComponentFixture<EmbedReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedReportComponent]
    });
    fixture = TestBed.createComponent(EmbedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
