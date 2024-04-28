import { TestBed } from '@angular/core/testing';

import { FileUploadedService } from './file-uploaded.service';

describe('FileUploadedService', () => {
  let service: FileUploadedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
