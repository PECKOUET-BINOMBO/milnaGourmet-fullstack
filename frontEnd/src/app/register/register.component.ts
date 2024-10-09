import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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

}
