import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFirstSection } from './page-first-section';

describe('PageFirstSection', () => {
  let component: PageFirstSection;
  let fixture: ComponentFixture<PageFirstSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFirstSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFirstSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
