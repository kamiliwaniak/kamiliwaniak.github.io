import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSecondSection } from './page-second-section';

describe('PageSecondSection', () => {
  let component: PageSecondSection;
  let fixture: ComponentFixture<PageSecondSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSecondSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSecondSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
