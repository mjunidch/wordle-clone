import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSwitchComponent } from './game-switch.component';

describe('GameSwitchComponent', () => {
  let component: GameSwitchComponent;
  let fixture: ComponentFixture<GameSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
