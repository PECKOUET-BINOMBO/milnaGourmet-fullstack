import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-login-oublie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgOptimizedImage, RouterLink, NavbarComponent],
  templateUrl: './login-oublie.component.html',
  styleUrl: './login-oublie.component.scss'
})
export class LoginOublieComponent {
  logoUrl = 'images/logo2.png'

  fb = inject(FormBuilder);
  http = inject(HttpClient);

  form = this.fb.nonNullable.group({
   // Email : requis, doit être un format d'email valide
   email: ['', [Validators.required, Validators.email]],

  });
  errorMessage: string | null = null;

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulaire valide', this.form.value);
      // Ici, vous pouvez ajouter la logique pour envoyer les données au serveur
    } else {
      console.log('Formulaire invalide');
      this.errorMessage = 'Veuillez corriger l\'erreur dans le formulaire.';
    }
  }
}
