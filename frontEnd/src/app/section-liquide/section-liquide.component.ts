import { Component } from '@angular/core';
import { NgOptimizedImage, NgFor, CurrencyPipe } from '@angular/common';
import { ServicePanier } from '../services/service-panier';
import { FormsModule } from '@angular/forms';

// Définition de l'interface Product pour typer nos produits liquides
interface Produit {
  id: number;        // Identifiant unique du produit
  nom: string;      // Nom du produit
  description: string; // Description du produit
  prix: number;     // Prix du produit en Francs CFA
  imageUrl: string;  // URL de l'image du produit
  quantite: number; // Propriété pour gérer la quantité sélectionnée
}


@Component({
  selector: 'app-section-liquide',
  standalone: true,
  imports: [NgOptimizedImage, NgFor, CurrencyPipe, FormsModule],
  templateUrl: './section-liquide.component.html',
  styleUrl: './section-liquide.component.scss'
})
export class SectionLiquideComponent {
  // Tableau des produits liquides disponibles
  produits: Produit[] = [
    {
      id: 1,
      nom: 'Bissap',
      description: 'Gourmet liquide à l\'hibiscus',
      prix: 2500,
      imageUrl: 'images/header.png',
      quantite: 1
    },
    {
      id: 2,
      nom: 'Mil',
      description: 'Gourmet liquide au mil',
      prix: 2500,
      imageUrl: 'images/header.png',
      quantite: 1
    },
    {
      id: 3,
      nom: 'Couscous',
      description: 'Gourmet liquide au couscous',
      prix: 2500,
      imageUrl: 'images/header.png',
      quantite: 1
    },
    {
      id: 4,
      nom: 'Coco',
      description: 'Gourmet liquide au coco',
      prix: 3500,
      imageUrl: 'images/header.png',
      quantite: 1
    }
  ];

  // Tableau pour les options de quantité
  quantiteOptions = [1, 2, 3, 4, 5];

  constructor(private servicePanier: ServicePanier) {}

  // Méthode pour ajouter un produit au panier
  ajouterAuPanier(produit: Produit) {
    this.servicePanier.ajouterAuPanier({
      id: produit.id,
    nom: produit.nom,
    prix: produit.prix,
    quantite: Number(produit.quantite),
    type: 'liquide'
    });

// Réinitialiser la quantité à 1 après l'ajout au panier
produit.quantite = 1;
  }

  // Méthode pour gérer le changement de quantité
  changerQuantite(produit: Produit, nouvelleQuantite: number) {
    produit.quantite = nouvelleQuantite;
  }

}
