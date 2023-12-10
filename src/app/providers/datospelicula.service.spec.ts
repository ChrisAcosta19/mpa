import { TestBed } from '@angular/core/testing';

import { DatospeliculaService } from './datospelicula.service';

describe('DatospeliculaService', () => {
  let service: DatospeliculaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatospeliculaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
