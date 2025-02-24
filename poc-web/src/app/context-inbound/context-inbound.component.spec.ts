import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextInboundComponent } from './context-inbound.component';

describe('ContextInboundComponent', () => {
  let component: ContextInboundComponent;
  let fixture: ComponentFixture<ContextInboundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContextInboundComponent]
    });
    fixture = TestBed.createComponent(ContextInboundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
