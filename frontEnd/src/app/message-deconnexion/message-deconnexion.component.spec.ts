import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDeconnexionComponent } from './message-deconnexion.component';

describe('MessageDeconnexionComponent', () => {
  let component: MessageDeconnexionComponent;
  let fixture: ComponentFixture<MessageDeconnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageDeconnexionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageDeconnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
