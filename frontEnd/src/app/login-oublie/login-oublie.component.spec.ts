import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOublieComponent } from './login-oublie.component';

describe('LoginOublieComponent', () => {
  let component: LoginOublieComponent;
  let fixture: ComponentFixture<LoginOublieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginOublieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginOublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
