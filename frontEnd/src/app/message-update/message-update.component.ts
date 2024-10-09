import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-message-update',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './message-update.component.html',
  styleUrl: './message-update.component.scss'
})
export class MessageUpdateComponent {
 urlPhotoBoot = 'images/boot.jpg'
}
