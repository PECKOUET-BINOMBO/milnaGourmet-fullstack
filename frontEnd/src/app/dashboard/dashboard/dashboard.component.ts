import { Component } from '@angular/core';
import { BarComponent } from "../bar/bar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
