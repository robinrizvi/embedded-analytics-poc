import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedTileComponent } from './embed-tile.component';

describe('EmbedTileComponent', () => {
  let component: EmbedTileComponent;
  let fixture: ComponentFixture<EmbedTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedTileComponent]
    });
    fixture = TestBed.createComponent(EmbedTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
