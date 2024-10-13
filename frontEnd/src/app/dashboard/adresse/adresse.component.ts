import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-adresse',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './adresse.component.html',
  styleUrl: './adresse.component.scss'
})
export class AdresseComponent {
   logo ='../images/logo2.png';
  photoProfil = '../images/boot.jpg';
  isFormAddVisible = false;
  isFormUpdateVisible = false;

  toggleFormAdd() {
    this.isFormAddVisible = !this.isFormAddVisible;
  }

  toggleFormUpdate() {
    this.isFormUpdateVisible = !this.isFormUpdateVisible;
  }

}
