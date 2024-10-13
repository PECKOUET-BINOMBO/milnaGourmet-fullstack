import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.scss'
})
export class CategorieComponent {
  isFormAddVisible = false;
  isFormUpdateVisible = false;

  toggleFormAdd() {
    this.isFormAddVisible = !this.isFormAddVisible;
  }

  toggleFormUpdate() {
    this.isFormUpdateVisible = !this.isFormUpdateVisible;
  }

}
