import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-panier',
  standalone: true,
  imports: [],
  templateUrl: './message-panier.component.html',
  styleUrl: './message-panier.component.scss'
})
export class MessagePanierComponent {
  @Input() produitNom: string = '';  // Input pour recevoir le nom du produit

  urlPhotoBoot = 'images/boot.jpg'
  urlPhotobag = 'images/bag.gif'
}
