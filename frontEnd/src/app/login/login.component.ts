import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgOptimizedImage, RouterLink, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  logoUrl = 'images/logo2.png';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;

  onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      this.authService.login(email, password).subscribe({
        next: () => {
          this.successMessage = "Connexion réussie ! Vous allez être redirigé vers la page d'accueil.";
          this.errorMessage = null;
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/']);
          }, 3000);
        },
        error: (err) => {
          this.errorMessage = this.getErrorMessage(err.code);
          this.successMessage = null;
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire.';
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return "Aucun utilisateur trouvé avec cette adresse email.";
      case 'auth/wrong-password':
        return "Mot de passe incorrect.";
      case 'auth/invalid-email':
        return "L'adresse email n'est pas valide.";
      default:
        return "Une erreur s'est produite lors de la connexion. Veuillez réessayer.";
    }
  }
}
