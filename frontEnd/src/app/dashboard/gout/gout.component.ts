import { Component } from '@angular/core';
import { BarComponent } from "../bar/bar.component";

@Component({
  selector: 'app-gout',
  standalone: true,
  imports: [BarComponent],
  templateUrl: './gout.component.html',
  styleUrl: './gout.component.scss'
})
export class GoutComponent {

}
