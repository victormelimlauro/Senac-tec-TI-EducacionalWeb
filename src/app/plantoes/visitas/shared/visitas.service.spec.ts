import { TestBed } from '@angular/core/testing';

import { VisitasService } from './visitas.service';

describe('VisitasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisitasService = TestBed.get(VisitasService);
    expect(service).toBeTruthy();
  });
});
