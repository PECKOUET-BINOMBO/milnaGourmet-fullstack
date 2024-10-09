import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-message-panier',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './message-panier.component.html',
  styleUrl: './message-panier.component.scss'
})
export class MessagePanierComponent {
  @Input() produitNom: string = '';  // Input pour recevoir le nom du produit

  urlPhotoBoot = 'images/boot.jpg'
  urlPhotobag = 'images/bag.gif'
}
