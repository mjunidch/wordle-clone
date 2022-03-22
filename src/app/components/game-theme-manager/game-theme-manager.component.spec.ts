import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameThemeManagerComponent } from './game-theme-manager.component';

describe('GameThemeManagerComponent', () => {
  let component: GameThemeManagerComponent;
  let fixture: ComponentFixture<GameThemeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameThemeManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameThemeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
