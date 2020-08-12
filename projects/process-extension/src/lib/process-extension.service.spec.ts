import { TestBed } from '@angular/core/testing';

import { ProcessExtensionService } from './process-extension.service';

describe('ProcessExtensionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessExtensionService = TestBed.get(ProcessExtensionService);
    expect(service).toBeTruthy();
  });
});
