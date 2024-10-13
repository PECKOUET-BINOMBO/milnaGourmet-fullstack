import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sauce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sauce.component.html',
  styleUrl: './sauce.component.scss'
})
export class SauceComponent {
  isFormAddVisible = false;
  isFormUpdateVisible = false;

  toggleFormAdd() {
    this.isFormAddVisible = !this.isFormAddVisible;
  }

  toggleFormUpdate() {
    this.isFormUpdateVisible = !this.isFormUpdateVisible;
  }
}
