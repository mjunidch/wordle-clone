import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameKeyboardComponent } from './game-keyboard.component';

describe('GameKeyboardComponent', () => {
  let component: GameKeyboardComponent;
  let fixture: ComponentFixture<GameKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
