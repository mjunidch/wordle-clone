import { TestBed } from '@angular/core/testing';

import { GameSettingsService } from './game-settings.service';

describe('GameSettingsService', () => {
  let service: GameSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
