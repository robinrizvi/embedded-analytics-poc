import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedAdhocComponent } from './embed-adhoc.component';

describe('EmbedAdhocComponent', () => {
  let component: EmbedAdhocComponent;
  let fixture: ComponentFixture<EmbedAdhocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedAdhocComponent]
    });
    fixture = TestBed.createComponent(EmbedAdhocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
