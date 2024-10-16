import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicePanier, ElementPanier } from '../services/service-panier';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent implements OnInit {
  elementsPanier: ElementPanier[] = [];
  total: number = 0;
  nombreTotalProduits: number = 0;
  types: ('cremeux' | 'liquide' | 'creation')[] = ['cremeux', 'liquide', 'creation'];
  panierEstVide: boolean = true;
  isPanierOpen: boolean = false;

  @ViewChild('panierDropdown') panierDropdown!: ElementRef;

  constructor(
    private servicePanier: ServicePanier,
    private eRef: ElementRef
  ) {}

  ngOnInit() {
    this.servicePanier.panier$.subscribe(elements => {
      this.elementsPanier = elements;
      this.calculerTotal();
      this.calculerNombreTotalProduits();
      this.panierEstVide = this.elementsPanier.length === 0;
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (this.isPanierOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isPanierOpen = false;
    }
  }

  togglePanier(event: Event): void {
    event.stopPropagation();
    this.isPanierOpen = !this.isPanierOpen;
  }

  retirerElement(element: ElementPanier, event: Event) {
    event.stopPropagation(); // Empêche la propagation du clic
    this.servicePanier.retirerDuPanier(element.id, element.type);
    // Ne pas fermer le panier ici
  }

  augmenterQuantite(element: ElementPanier) {
    this.mettreAJourQuantite(element, element.quantite + 1);
  }

  diminuerQuantite(element: ElementPanier) {
    if (element.quantite > 1) {
      this.mettreAJourQuantite(element, element.quantite - 1);
    }
  }

  private mettreAJourQuantite(element: ElementPanier, nouvelleQuantite: number) {
    this.servicePanier.mettreAJourQuantite(element.id, element.type, nouvelleQuantite);
  }

  private calculerTotal() {
    this.total = this.servicePanier.calculerTotal();
  }

  private calculerNombreTotalProduits() {
    this.nombreTotalProduits = this.servicePanier.calculerNombreTotalProduits();
  }

  getElementsParType(type: 'cremeux' | 'liquide' | 'creation'): ElementPanier[] {
    return this.elementsPanier.filter(element => element.type === type);
  }
}
