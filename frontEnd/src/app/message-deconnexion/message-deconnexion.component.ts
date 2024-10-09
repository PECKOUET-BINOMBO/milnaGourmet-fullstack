import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-message-deconnexion',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './message-deconnexion.component.html',
  styleUrl: './message-deconnexion.component.scss'
})
export class MessageDeconnexionComponent {
  urlPhotoBoot = 'images/boot.jpg'


}
