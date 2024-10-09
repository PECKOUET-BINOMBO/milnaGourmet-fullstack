import { Component, OnInit, Output, EventEmitter, Input, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { User } from '@angular/fire/auth';
import { UserInterface } from '../user.interface';
import { Router } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';
import { firstValueFrom } from 'rxjs';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgOptimizedImage, NavbarComponent],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.scss'
})
export class CompteComponent implements OnInit {
  logoUrl = 'images/logo2.png';


  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', [Validators.required, Validators.pattern(/^(?:(?:\+|00)241|0)?[1-9](?:[0-9]{7})$/)]],
    adresse: ['', [Validators.required]],
    password: ['', [Validators.minLength(8)]],
    currentPassword: ['']
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;
  currentUser: UserInterface | null = null;

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user: User | null) => {
        if (user) {
          this.authService.getUserData(user.uid).subscribe({
            next: (userData: UserInterface) => {
              this.currentUser = userData;
              this.form.patchValue({
                name: userData.name || '',
                email: userData.email || '',
                tel: userData.tel || '',
                adresse: userData.adresse || ''
              });
            },
            error: (error) => {
              console.error('Error fetching user data:', error);
              this.errorMessage = "Erreur lors du chargement des données utilisateur.";
            }
          });
        }
      },
      error: (error) => {
        console.error('Error getting current user:', error);
        this.errorMessage = "Erreur lors de la récupération de l'utilisateur actuel.";
      }
    });
  }

  async onSubmit(): Promise<void> {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.form.valid && this.currentUser) {
      const updatedFields: Partial<UserInterface> = {};
      let passwordChanged = false;
      let emailChanged = false;

      const formKeys: (keyof UserInterface)[] = ['name', 'email', 'tel', 'adresse'];
      formKeys.forEach(key => {
        const control = this.form.get(key);
        if (control && control.dirty && control.valid && control.value !== null && control.value !== undefined && control.value !== '') {
          if (key === 'email' && control.value !== this.currentUser?.email) {
            emailChanged = true;
          }
          updatedFields[key] = control.value;
        }
      });

      const passwordControl = this.form.get('password');
      if (passwordControl && passwordControl.dirty && passwordControl.valid && passwordControl.value) {
        passwordChanged = true;
      }

      if (Object.keys(updatedFields).length === 0 && !passwordChanged) {
        this.errorMessage = "Aucune modification à mettre à jour.";
        return;
      }

      try {
        if (Object.keys(updatedFields).length > 0) {
          const currentPassword = this.form.get('currentPassword')?.value || undefined;
          if (emailChanged && !currentPassword) {
            this.errorMessage = "Le mot de passe actuel est requis pour changer l'email.";
            return;
          }
          await firstValueFrom(this.authService.updateUser(updatedFields, currentPassword));
        }

        if (passwordChanged) {
          const newPassword = this.form.get('password')?.value;
          if (newPassword) {
            await firstValueFrom(this.authService.updatePassword(newPassword));
          }
        }

        this.successMessage = "Profil mis à jour avec succès !";
        if (passwordChanged) {
          this.successMessage += " Mot de passe modifié.";
        }

        this.resetForm();
      } catch (error) {
        console.error('Error updating user data:', error);
        this.errorMessage = this.getErrorMessage((error as FirebaseError).code);
      }
    } else {
      this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
    }
  }

  private async updateUserData(updatedFields: Partial<UserInterface>): Promise<void> {
    if (!this.currentUser) throw new Error("No current user");

    const updatedUser: UserInterface = {
      ...this.currentUser,
      ...updatedFields
    };

    await firstValueFrom(this.authService.updateUser(updatedUser));
  }

  private resetForm(): void {
    this.form.reset();
    this.loadUserData();
    setTimeout(() => {
      this.successMessage = null;
      this.router.navigate(['/accueil']);
    }, 3000);
  }

  onDeleteAccount(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      this.authService.deleteAccount().subscribe({
        next: () => {
          this.successMessage = "Compte supprimé avec succès. Vous allez être redirigé vers la page d'accueil.";
          this.errorMessage = null;
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/']);
          }, 3000);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du compte:', err);
          this.errorMessage = "Une erreur s'est produite lors de la suppression du compte. Veuillez réessayer.";
          this.successMessage = null;
        }
      });
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/requires-recent-login':
        return "Pour des raisons de sécurité, veuillez vous reconnecter avant d'effectuer cette action.";
      case 'auth/email-already-in-use':
        return "Cette adresse email est déjà utilisée.";
      case 'auth/invalid-email':
        return "L'adresse email n'est pas valide.";
      case 'auth/weak-password':
        return "Le mot de passe est trop faible. Il doit contenir au moins 8 caractères.";
      default:
        return "Une erreur s'est produite. Veuillez réessayer.";
    }
  }
}
