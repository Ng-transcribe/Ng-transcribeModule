import { TestBed } from '@angular/core/testing';

import { NgTranscribeService } from './ng-transcribe.service';

describe('NgTranscribeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgTranscribeService = TestBed.get(NgTranscribeService);
    expect(service).toBeTruthy();
  });
});
