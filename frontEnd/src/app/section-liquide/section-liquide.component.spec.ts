import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionLiquideComponent } from './section-liquide.component';

describe('SectionLiquideComponent', () => {
  let component: SectionLiquideComponent;
  let fixture: ComponentFixture<SectionLiquideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionLiquideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionLiquideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
