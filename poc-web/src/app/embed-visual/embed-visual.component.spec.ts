import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedVisualComponent } from './embed-visual.component';

describe('EmbedVisualComponent', () => {
  let component: EmbedVisualComponent;
  let fixture: ComponentFixture<EmbedVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedVisualComponent]
    });
    fixture = TestBed.createComponent(EmbedVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
