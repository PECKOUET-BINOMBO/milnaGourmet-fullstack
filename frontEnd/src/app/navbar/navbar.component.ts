import { NgOptimizedImage, ViewportScroller, CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, ElementRef, HostListener, Input } from '@angular/core';
import { PanierComponent } from "../panier/panier.component";
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from '../auth.service';
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
export class NavbarComponent implements OnInit {
  @Input() isOpen: boolean = false;

  logoUrl = 'images/logo2.png';
  iconCompte = 'images/compte.gif';
  currentUser$: Observable<User | null>;
  isDropdownOpen = false;

  isPanierOpen = false;
  isLoggedIn = false;


  @Output() deconnexionReussie = new EventEmitter<void>();

  constructor(
    private viewportScroller: ViewportScroller,
    private authService: AuthService,
    private router: Router,
    private eRef: ElementRef
  ) {
    this.currentUser$ = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
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

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.currentUser$ = new Observable<null>(); // Réinitialiser l'observable
        this.deconnexionReussie.emit();
        this.router.navigate(['/']); // Redirection vers la page d'accueil
        this.closeDropdown();
      },
      error: (error) => {
        console.error('Logout error', error);
      }
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;

  }

  

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}
