import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage, NgFor, CurrencyPipe, NgIf } from '@angular/common';
import { ServicePanier } from '../services/service-panier';
import { FormsModule } from '@angular/forms';
import { MessagePanierComponent } from '../message-panier/message-panier.component';
import { Observable } from 'rxjs';

// Définition de l'interface Product pour typer nos produits
interface Produit {
  id: number;        // Identifiant unique du produit
  nom: string;      // Nom du produit
  description: string; // Description du produit
  prix: number;     // Prix du produit en Francs CFA
  imageUrl: string;  // URL de l'image du produit
  quantite: number; // Propriété pour gérer la quantité sélectionnée
}


@Component({
  selector: 'app-section-cremeux',
  standalone: true,
  imports: [NgOptimizedImage, NgFor, CurrencyPipe, FormsModule, NgIf, MessagePanierComponent],
  templateUrl: './section-cremeux.component.html',
  styleUrl: './section-cremeux.component.scss'
})
export class SectionCremeuxComponent {
  // Tableau des produits disponibles
  produits: Produit[] = [
    {
      id: 1,
      nom: 'Nature',
      description: 'Gourmet sans sucre',
      prix: 450,
      imageUrl: 'images/header.png',
      quantite: 1
    },
    {
      id: 2,
      nom: 'Simple',
      description: 'Gourmet avec sucre',
      prix: 600,
      imageUrl: 'images/header.png',
      quantite: 1
    },
    {
      id: 3,
      nom: 'Céréales',
      description: 'Gourmet avec céréales',
      prix: 1000,
      imageUrl: 'images/header.png',
      quantite: 1
    }
  ];

  // Tableau pour les options de quantité
  quantiteOptions = [1, 2, 3, 4, 5];

  // Déclarons ces propriétés comme Observable
  afficherMessage$!: Observable<boolean>;
  produitAjoute$!: Observable<string>;

  constructor(private servicePanier: ServicePanier) {}

  ngOnInit() {
    // Initialisons les Observables dans ngOnInit
    this.afficherMessage$ = this.servicePanier.afficherMessage$;
    this.produitAjoute$ = this.servicePanier.produitAjoute$;
  }

  // Méthode pour ajouter un produit au panier
  ajouterAuPanier(produit: Produit) {
    this.servicePanier.ajouterAuPanier({
      id: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      quantite: Number(produit.quantite),
      type: 'cremeux'
    });

// Réinitialiser la quantité à 1 après l'ajout au panier
produit.quantite = 1;
  }

  // Méthode pour gérer le changement de quantité
  changerQuantite(produit: Produit, nouvelleQuantite: number) {
    produit.quantite = nouvelleQuantite;
  }

}
