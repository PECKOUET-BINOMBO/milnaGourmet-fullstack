import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCreationComponent } from './section-creation.component';

describe('SectionCreationComponent', () => {
  let component: SectionCreationComponent;
  let fixture: ComponentFixture<SectionCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
