import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedQnaComponent } from './embed-qna.component';

describe('EmbedQnaComponent', () => {
  let component: EmbedQnaComponent;
  let fixture: ComponentFixture<EmbedQnaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedQnaComponent]
    });
    fixture = TestBed.createComponent(EmbedQnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
