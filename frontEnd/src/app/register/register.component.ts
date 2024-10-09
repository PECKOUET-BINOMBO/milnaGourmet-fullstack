import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../user.interface';
import { NgOptimizedImage } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgOptimizedImage, NavbarComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  logoUrl = 'images/logo2.png'
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', [Validators.required, Validators.pattern(/^(?:(?:\+|00)241|0)?[1-9](?:[0-9]{7})$/)]],
    adresse: ['', Validators.required],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      //Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]],
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;

  onSubmit(): void {
    if (this.form.valid) {
      const userData: UserInterface = this.form.getRawValue() as UserInterface;
      this.authService.register(userData).subscribe({
        next: () => {
          this.successMessage = "Inscription réussie ! Vous allez être redirigé vers la page d'accueil.";
          this.errorMessage = null;
          this.form.reset();

          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/']); // Redirection vers la page de connexion
          }, 3000);
        },
        error: (err) => {
          console.error('Erreur lors de l\'inscription:', err);
          this.errorMessage = this.getErrorMessage(err.code);
          this.successMessage = null;
        }
      });
    } else {
      this.errorMessage = "Veuillez remplir correctement tous les champs du formulaire.";
      this.successMessage = null;
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return "Cette adresse email est déjà utilisée.";
      case 'auth/invalid-email':
        return "L'adresse email n'est pas valide.";
      case 'auth/weak-password':
        return "Le mot de passe est trop faible. Il doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.";
      default:
        return "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.";
    }
  }
}
