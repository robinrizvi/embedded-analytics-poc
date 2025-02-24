import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedAdhocManualComponent } from './embed-adhoc-manual.component';

describe('EmbedAdhocManualComponent', () => {
  let component: EmbedAdhocManualComponent;
  let fixture: ComponentFixture<EmbedAdhocManualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedAdhocManualComponent]
    });
    fixture = TestBed.createComponent(EmbedAdhocManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
