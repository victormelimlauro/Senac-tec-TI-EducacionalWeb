import { TestBed } from '@angular/core/testing';

import { ComunicadosService } from './comunicados.service';

describe('ComunicadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComunicadosService = TestBed.get(ComunicadosService);
    expect(service).toBeTruthy();
  });
});
