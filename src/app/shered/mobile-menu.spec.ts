import { TestBed } from '@angular/core/testing';

import { MobileMenu } from './mobile-menu';

describe('MobileMenu', () => {
  let service: MobileMenu;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileMenu);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
