import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStatComponent } from './game-stat.component';

describe('GameStatComponent', () => {
  let component: GameStatComponent;
  let fixture: ComponentFixture<GameStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
