import { TestBed } from '@angular/core/testing';

import { AppointmentCrudService } from './appointment-crud.service';

describe('AppointmentCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppointmentCrudService = TestBed.get(AppointmentCrudService);
    expect(service).toBeTruthy();
  });
});
