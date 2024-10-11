import {ViewportScroller, CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { PanierComponent } from "../panier/panier.component";
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
        PanierComponent,
    RouterLink,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  logoUrl = 'images/logo2.png';
  iconCompte = 'images/compte.gif';
  isDropdownOpen = false;
  isPanierOpen = false;
  isLoggedIn = false;

  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  constructor(
    private viewportScroller: ViewportScroller,
    private eRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isPanierOpen = false;
      this.isDropdownOpen = false;
    } else if (this.isDropdownOpen && this.dropdownMenu && !this.dropdownMenu.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  togglePanier(event: Event): void {
    event.stopPropagation();
    this.isPanierOpen = !this.isPanierOpen;
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  scrollToElement(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}
