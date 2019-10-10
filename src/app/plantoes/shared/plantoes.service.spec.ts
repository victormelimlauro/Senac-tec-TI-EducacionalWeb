import { TestBed } from '@angular/core/testing';

import { PlantoesService } from './plantoes.service';

describe('PlantoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlantoesService = TestBed.get(PlantoesService);
    expect(service).toBeTruthy();
  });
});
