import { Component } from '@angular/core';
import { BarComponent } from "../bar/bar.component";

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [BarComponent],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.scss'
})
export class CommandeComponent {

}
