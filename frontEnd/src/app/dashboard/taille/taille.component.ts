import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-taille',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taille.component.html',
  styleUrl: './taille.component.scss'
})
export class TailleComponent {
  isFormAddVisible = false;
  isFormUpdateVisible = false;

  toggleFormAdd() {
    this.isFormAddVisible = !this.isFormAddVisible;
  }

  toggleFormUpdate() {
    this.isFormUpdateVisible = !this.isFormUpdateVisible;
  }

}
