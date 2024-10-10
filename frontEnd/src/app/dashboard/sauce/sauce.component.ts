import { Component } from '@angular/core';
import { BarComponent } from "../bar/bar.component";

@Component({
  selector: 'app-sauce',
  standalone: true,
  imports: [BarComponent],
  templateUrl: './sauce.component.html',
  styleUrl: './sauce.component.scss'
})
export class SauceComponent {

}
