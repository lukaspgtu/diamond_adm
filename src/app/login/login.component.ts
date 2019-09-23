import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert/alert.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/user/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from '../services/loading/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(
    title: Title,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alert: AlertService,
    private spinner: LoadingService,
    private spinnner: NgxSpinnerService
  ) {
    title.setTitle('Login | Diamond Trading')

  }

  ngOnInit() {

    this.spinnner.show();
    setTimeout(() => {
      this.spinnner.hide();
    }, 3000);


    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.alert.error('Preencha todos os dados!')
    }
    else {
      this.spinner.show('Autenticando')
      return this.auth.login(this.loginForm.value.username,
        this.loginForm.value.password).subscribe(date => {
          if (date.success) {
            this.spinner.hide();
            this.alert.success(date.message)
            this.router.navigate(['/home'])
          }
          else {
            this.spinner.hide();
            this.alert.error(date.message)
          }
        })
    }
  }
}
