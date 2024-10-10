import { Component } from '@angular/core';
import { BarComponent } from "../bar/bar.component";

@Component({
  selector: 'app-taille',
  standalone: true,
  imports: [BarComponent],
  templateUrl: './taille.component.html',
  styleUrl: './taille.component.scss'
})
export class TailleComponent {

}
