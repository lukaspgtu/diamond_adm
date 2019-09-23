import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  show(message: string): void {
    Swal.fire({
      title: "Aguarde!",
      text: message,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
  }

  hide(): void {
    Swal.close();
  }
}
