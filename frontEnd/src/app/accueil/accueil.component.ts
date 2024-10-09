import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SectionCremeuxComponent } from "../section-cremeux/section-cremeux.component";
import { SectionLiquideComponent } from "../section-liquide/section-liquide.component";
import { SectionCreationComponent } from "../section-creation/section-creation.component";
import { ContactComponent } from "../contact/contact.component";
import { FooterComponent } from "../footer/footer.component";
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { MessagePanierComponent } from "../message-panier/message-panier.component";
import { ServicePanier } from '../services/service-panier';
import { NavbarComponent } from "../navbar/navbar.component";
import { MessageDeconnexionComponent } from "../message-deconnexion/message-deconnexion.component";
import { MessageUpdateComponent } from '../message-update/message-update.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [HeaderComponent, SectionCremeuxComponent, SectionLiquideComponent, SectionCreationComponent, ContactComponent, FooterComponent, AsyncPipe, NgIf, MessagePanierComponent, NavbarComponent, MessageDeconnexionComponent, MessageUpdateComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})

export class AccueilComponent implements OnInit {
  title = 'milnaGourmet';
  afficherMessage$!: Observable<boolean>;
  produitAjoute$!: Observable<string>;
  afficherMessageDeconnexion$ = new BehaviorSubject<boolean>(false);





  constructor(private servicePanier: ServicePanier) {}

  ngOnInit() {
    this.afficherMessage$ = this.servicePanier.afficherMessage$;
    this.produitAjoute$ = this.servicePanier.produitAjoute$;
  }

  onDeconnexionReussie() {
    this.afficherMessageDeconnexion$.next(true);
    timer(2000).subscribe(() => {
      this.afficherMessageDeconnexion$.next(false);
    });
  }


}
