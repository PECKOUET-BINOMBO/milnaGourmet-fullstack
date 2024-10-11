import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moncompte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './moncompte.component.html',
  styleUrl: './moncompte.component.scss'
})
export class MoncompteComponent {
  isDeleteModalVisible = false;
  isUpdateModalVisible = false;
  isConfirmationModalVisible = false;

  constructor(private router: Router /*, private authService: AuthService */) {}

  showDeleteModal() {
    this.isDeleteModalVisible = true;
  }

  hideDeleteModal() {
    this.isDeleteModalVisible = false;
  }



  showConfirmationModal() {
    this.isConfirmationModalVisible = true;
  }

  hideConfirmationModal() {
    this.isConfirmationModalVisible = false;
  }

  initiateAccountDeletion() {
    this.hideDeleteModal();
    this.showConfirmationModal();
  }


}
