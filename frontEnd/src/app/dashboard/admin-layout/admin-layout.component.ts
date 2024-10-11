import { Component } from '@angular/core';
import { BarComponent } from "../bar/bar.component";
import { RouterOutlet, RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    BarComponent,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
