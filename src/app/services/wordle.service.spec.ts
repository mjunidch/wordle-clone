import { TestBed } from '@angular/core/testing';

import { WordleService } from './wordle.service';

describe('WordleService', () => {
  let service: WordleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
