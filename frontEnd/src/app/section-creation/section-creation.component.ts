import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicePanier } from '../services/service-panier';

// Interface pour définir la structure d'une taille de yaourt
interface Size {
  id: string;
  nom: string;
  prix: number;
  maxFruits: number;
  maxSauces: number;
  description: string;
}

// Interface pour définir la structure d'un ingrédient (fruit ou sauce)
interface Ingredient {
  id: string;
  nom: string;
}

@Component({
  selector: 'app-section-creation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './section-creation.component.html',
  styleUrl: './section-creation.component.scss'
})

export class SectionCreationComponent {
  sizes: Size[] = [
    {
      id: 'medium',
      nom: 'Moyen',
      prix: 2500,
      maxFruits: 1,
      maxSauces: 1,
      description: '1 fruit + 1 sauce + céréale'
    },
    {
      id: 'large',
      nom: 'Maxi',
      prix: 3500,
      maxFruits: 2,
      maxSauces: 2,
      description: '2 fruits + 2 sauces + céréale'
    }
  ];

  // Liste des fruits disponibles
  fruits: Ingredient[] = [
    { id: 'raisin', nom: 'Raisin' },
    { id: 'ananas', nom: 'Ananas' },
    { id: 'mangue', nom: 'Mangue' },
    { id: 'passion', nom: 'Passion' },
    { id: 'kiwi', nom: 'Kiwi' },
    { id: 'coco', nom: 'Coco' },
    { id: 'fraise', nom: 'Fraise' },
    { id: 'framboise', nom: 'Framboise' }
  ];

  // Liste des sauces disponibles
  sauces: Ingredient[] = [
    { id: 'cerise', nom: 'Sauce cérise' },
    { id: 'abricot', nom: 'Sauce abricot' },
    { id: 'miel', nom: 'Miel' }
  ];

  // Variables pour stocker les sélections de l'utilisateur
  selectedSize: Size | null = null;
  selectedFruits: Ingredient[] = [];
  selectedSauces: Ingredient[] = [];
  quantity: number = 1;

  constructor(private servicePanier: ServicePanier) {}

  // Méthode appelée lors du changement de taille
  onSizeChange() {
    // Réinitialiser complètement les sélections
    this.selectedFruits = [];
    this.selectedSauces = [];
  }

  // Méthode pour gérer la sélection des fruits
  onFruitChange(fruit: Ingredient) {
    if (this.selectedFruits.includes(fruit)) {
      this.selectedFruits = this.selectedFruits.filter(f => f !== fruit);
    } else if (this.selectedFruits.length < (this.selectedSize?.maxFruits || 0)) {
      this.selectedFruits.push(fruit);
    }
  }

  // Méthode pour gérer la sélection des sauces
  onSauceChange(sauce: Ingredient) {
    if (this.selectedSauces.includes(sauce)) {
      this.selectedSauces = this.selectedSauces.filter(s => s !== sauce);
    } else if (this.selectedSauces.length < (this.selectedSize?.maxSauces || 0)) {
      this.selectedSauces.push(sauce);
    }
  }

  // Méthode pour vérifier si la sélection est valide
  isSelectionValid(): boolean {
    return !!this.selectedSize &&
           this.selectedFruits.length === this.selectedSize.maxFruits &&
           this.selectedSauces.length === this.selectedSize.maxSauces;
  }

  // Méthode pour ajouter au panier
  addToCart() {
    if (this.isSelectionValid()) {
      const creationNom = `${this.selectedSize!.nom} - ${this.selectedFruits.map(f => f.nom).join(', ')} - ${this.selectedSauces.map(s => s.nom).join(', ')}`;

      this.servicePanier.ajouterAuPanier({
        id: Date.now(), // Utiliser un timestamp comme ID unique
        nom: creationNom,
        prix: this.selectedSize!.prix,
        quantite: this.quantity,
        type: 'creation'
      });

      // Réinitialiser les sélections après l'ajout au panier
      this.selectedSize = null;
      this.selectedFruits = [];
      this.selectedSauces = [];
      this.quantity = 1;
    }
  }
}
