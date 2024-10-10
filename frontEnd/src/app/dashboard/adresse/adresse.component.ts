import { Component } from '@angular/core';
import { BarComponent } from "../bar/bar.component";
import { RouterOutlet, RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-adresse',
  standalone: true,
  imports: [BarComponent, RouterLink, RouterOutlet],
  templateUrl: './adresse.component.html',
  styleUrl: './adresse.component.scss'
})
export class AdresseComponent {
   logo ='../images/logo2.png'
  photoProfil = '../images/boot.jpg'

}
