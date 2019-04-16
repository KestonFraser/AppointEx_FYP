import { TestBed } from '@angular/core/testing';

import { UserProfileCrudService } from './user-profile-crud.service';

describe('UserProfileCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProfileCrudService = TestBed.get(UserProfileCrudService);
    expect(service).toBeTruthy();
  });
});
