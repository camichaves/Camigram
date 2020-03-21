import { TestBed } from '@angular/core/testing';

import { SubirPostService } from './subir-post.service';

describe('SubirPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubirPostService = TestBed.get(SubirPostService);
    expect(service).toBeTruthy();
  });
});
