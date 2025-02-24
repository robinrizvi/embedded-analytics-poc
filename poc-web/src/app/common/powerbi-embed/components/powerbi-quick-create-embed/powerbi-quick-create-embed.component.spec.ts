import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerbiQuickCreateEmbedComponent } from './powerbi-quick-create-embed.component';

describe('PowerbiQuickCreateEmbedComponent', () => {
  let component: PowerbiQuickCreateEmbedComponent;
  let fixture: ComponentFixture<PowerbiQuickCreateEmbedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PowerbiQuickCreateEmbedComponent]
    });
    fixture = TestBed.createComponent(PowerbiQuickCreateEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
