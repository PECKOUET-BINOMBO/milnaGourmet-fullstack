import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePanierComponent } from './message-panier.component';

describe('MessagePanierComponent', () => {
  let component: MessagePanierComponent;
  let fixture: ComponentFixture<MessagePanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagePanierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagePanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
