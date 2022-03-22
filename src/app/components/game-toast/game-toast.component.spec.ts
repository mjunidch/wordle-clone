import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameToastComponent } from './game-toast.component';

describe('GameToastComponent', () => {
  let component: GameToastComponent;
  let fixture: ComponentFixture<GameToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameToastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
