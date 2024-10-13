import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-fruit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fruit.component.html',
  styleUrl: './fruit.component.scss'
})
export class FruitComponent {
  isFormAddVisible = false;
  isFormUpdateVisible = false;

  toggleFormAdd() {
    this.isFormAddVisible = !this.isFormAddVisible;
  }

  toggleFormUpdate() {
    this.isFormUpdateVisible = !this.isFormUpdateVisible;
  }
}
