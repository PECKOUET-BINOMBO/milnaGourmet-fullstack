import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss'
})
export class BarComponent {
  logo ='../images/logo2.png'
  photoProfil = '../images/boot.jpg'

}
