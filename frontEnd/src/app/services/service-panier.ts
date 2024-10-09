import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ElementPanier {
  id: number;
  nom: string;
  prix: number;
  quantite: number;
  type: 'cremeux' | 'liquide' | 'creation';
}

@Injectable({
  providedIn: 'root'
})
export class ServicePanier {

  private _panier = new BehaviorSubject<ElementPanier[]>([]);
  panier$ = this._panier.asObservable();

  // Nouveau BehaviorSubject pour gérer l'affichage du message
  private _afficherMessage = new BehaviorSubject<boolean>(false);
  afficherMessage$ = this._afficherMessage.asObservable();

  // Nouveau BehaviorSubject pour stocker le nom du produit ajouté
  private _produitAjoute = new BehaviorSubject<string>('');
  produitAjoute$ = this._produitAjoute.asObservable();

  constructor() {}

  ajouterAuPanier(element: ElementPanier) {
    const panierCourant = this._panier.value;
    const elementExistant = panierCourant.find(item => item.id === element.id && item.type === element.type);

    if (elementExistant) {
      elementExistant.quantite = Number(elementExistant.quantite) + Number(element.quantite);
    } else {
      panierCourant.push({...element, quantite: Number(element.quantite)});
    }

    this._panier.next(panierCourant);

    // Déclencher l'affichage du message
    this._afficherMessage.next(true);
    this._produitAjoute.next(element.nom);

    // Programmer la disparition du message après 5 secondes
    setTimeout(() => {
      this._afficherMessage.next(false);
    }, 2000);

  }

  mettreAJourQuantite(id: number, type: 'cremeux' | 'liquide' | 'creation', nouvelleQuantite: number) {
    const panierCourant = this._panier.value;
    const elementAMettreAJour = panierCourant.find(item => item.id === id && item.type === type);

    if (elementAMettreAJour) {
      elementAMettreAJour.quantite = Number(nouvelleQuantite);
      this._panier.next(panierCourant);
    }
  }

  retirerDuPanier(id: number, type: 'cremeux' | 'liquide' | 'creation') {
    const panierCourant = this._panier.value;
    const panierMisAJour = panierCourant.filter(item => !(item.id === id && item.type === type));
    this._panier.next(panierMisAJour);
  }

  calculerTotal(): number {
    return this._panier.value.reduce((total, item) =>
      total + (Number(item.prix) * Number(item.quantite)), 0);
  }

  calculerNombreTotalProduits(): number {
    return this._panier.value.reduce((total, item) =>
      total + Number(item.quantite), 0);
  }


}
