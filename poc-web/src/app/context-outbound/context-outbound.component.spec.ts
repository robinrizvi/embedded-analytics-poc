import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextOutboundComponent } from './context-outbound.component';

describe('ContextOutboundComponent', () => {
  let component: ContextOutboundComponent;
  let fixture: ComponentFixture<ContextOutboundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContextOutboundComponent]
    });
    fixture = TestBed.createComponent(ContextOutboundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
