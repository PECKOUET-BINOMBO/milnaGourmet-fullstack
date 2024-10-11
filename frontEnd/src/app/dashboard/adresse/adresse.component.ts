import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-adresse',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './adresse.component.html',
  styleUrl: './adresse.component.scss'
})
export class AdresseComponent {
   logo ='../images/logo2.png'
  photoProfil = '../images/boot.jpg'

}
