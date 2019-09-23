import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private timer = 2500;

  constructor() { }

  success(message: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: this.timer
    })
    
    Toast.fire({
      type: 'success',
      title: message
    })
  }

  error(message: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: this.timer
    })
    
    Toast.fire({
      type: 'error',
      title: message
    })
  }

  warning(message: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: this.timer
    })
    
    Toast.fire({
      type: 'warning',
      title: message
    })
  }

  info(message: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: this.timer
    })
    
    Toast.fire({
      type: 'info',
      title: message
    })
  }

  question(message: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: this.timer
    })
    
    Toast.fire({
      type: 'question',
      title: message
    })
  }
}
