import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private timer = 3000;

  constructor() { }

  toast(message) {
    const Toast = Swal.mixin({
      toast: true,      
      showConfirmButton: false,
      timer: this.timer
    })
    Toast.fire({
      type: 'success',
      title: message
    })
  }

  success(message: string): void {
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Sucesso!',
      text: message,
      showConfirmButton: false,
      timer: this.timer
    });
  }

  error(message: string): void {
    Swal.fire({
      position: 'center',
      type: 'error',
      title: 'Ops!',
      text: message,
      showConfirmButton: false,
      timer: this.timer
    });
  }

  warning(message: string): void {
    Swal.fire({
      position: 'center',
      type: 'warning',
      title: 'Aviso!',
      text: message,
      showConfirmButton: false,
      timer: this.timer
    });
  }

  info(message: string): void {
    Swal.fire({
      position: 'center',
      type: 'info',
      title: 'Atenção!',
      text: message,
      showConfirmButton: false,
      timer: this.timer
    });
  }

  question(message: string): void {
    Swal.fire({
      position: 'center',
      type: 'question',
      title: message,
      showConfirmButton: false,
      timer: this.timer
    });
  }
}
