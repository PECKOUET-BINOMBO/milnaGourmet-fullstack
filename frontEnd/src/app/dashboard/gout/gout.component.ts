import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gout.component.html',
  styleUrl: './gout.component.scss'
})
export class GoutComponent {
  isFormAddVisible = false;
  isFormUpdateVisible = false;

  toggleFormAdd() {
    this.isFormAddVisible = !this.isFormAddVisible;
  }

  toggleFormUpdate() {
    this.isFormUpdateVisible = !this.isFormUpdateVisible;
  }

}
