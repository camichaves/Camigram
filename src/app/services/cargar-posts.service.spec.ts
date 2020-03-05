import { TestBed } from '@angular/core/testing';

import { CargarPostsService } from './cargar-posts.service';

describe('CargarPostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CargarPostsService = TestBed.get(CargarPostsService);
    expect(service).toBeTruthy();
  });
});
