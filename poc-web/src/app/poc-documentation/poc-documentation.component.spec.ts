import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocDocumentationComponent } from './poc-documentation.component';

describe('PocDocumentationComponent', () => {
  let component: PocDocumentationComponent;
  let fixture: ComponentFixture<PocDocumentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PocDocumentationComponent]
    });
    fixture = TestBed.createComponent(PocDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
