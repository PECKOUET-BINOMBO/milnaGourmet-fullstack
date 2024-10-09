import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCremeuxComponent } from './section-cremeux.component';

describe('SectionCremeuxComponent', () => {
  let component: SectionCremeuxComponent;
  let fixture: ComponentFixture<SectionCremeuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCremeuxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCremeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
