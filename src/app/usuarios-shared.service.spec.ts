import { TestBed } from '@angular/core/testing';

import { UsuariosSharedService } from './usuarios-shared.service';

describe('UsuariosSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuariosSharedService = TestBed.get(UsuariosSharedService);
    expect(service).toBeTruthy();
  });
});
