import { NgOptimizedImage, ViewportScroller, CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, ElementRef, HostListener, Input } from '@angular/core';
import { PanierComponent } from "../panier/panier.component";
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    PanierComponent,
    RouterLink,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {

  logoUrl = 'images/logo2.png';
  iconCompte = 'images/compte.gif';
  isDropdownOpen = false;

  isPanierOpen = false;
  isLoggedIn = false;



  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router,
    private eRef: ElementRef
  ) {
  }



  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isPanierOpen = false;
    }
  }

  togglePanier(event: Event): void {
    event.stopPropagation();
    this.isPanierOpen = !this.isPanierOpen;
  }

  scrollToElement(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }



  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;

  }



  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}
