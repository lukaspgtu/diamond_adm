import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../services/user/auth.service';
import { AlertService } from '../services/alert/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  plans: any[] = []
  user: any
  manager: any
  username: any
  isUsernameValid: boolean = true
  continueForm: FormGroup
  code: any
  inscricao: any
  id: number;

  constructor(title: Title,
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private alert: AlertService,
    private spinner: NgxSpinnerService) {

    title.setTitle('Register | Diamond Trading')

  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);

    this.continueForm = this.fb.group({
      gestor: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      date: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],

    });

    //Puxar dados gestor
    this.inscricao = this.route.params.subscribe((params: any) => {
      this.id = params['id']

      if (this.id) {
        this.manager = this.service.shared(this.id).subscribe(date => {

          if (date.success) {
            this.user = date.user
            this.manager = date.user.token
            localStorage.setItem('manager', JSON.stringify(this.manager));

          }
          else {
            // Redirecionar pagina de erro
          }
        })
      }
    })    

    this.service.listPlans().subscribe(date => {
      this.plans = date.plans
    })
  }

  continueRegister() {
    if (this.continueForm.invalid || this.isUsernameValid == false) {
      this.alert.error('Informe todos os dados')
    }
    else {
      localStorage.setItem('register', JSON.stringify(this.continueForm.value));
      this.router.navigate(['/initialplans'])
    }
  }

  validateUser() {
    this.auth.verifyUser(this.continueForm.value.username).subscribe(date => {
      if (date.success) {
        this.isUsernameValid = true
      }
      else {
        // this.alert.error(date.message)
        this.isUsernameValid = false
      }
    })
  }

  // validatePhone() {
  //   this.code = Math.floor(Math.random() * (999999 - 123456 + 1)) + 123456;
  //   this.service.validatePhone(this.code, 'this.continueForm.value.phone').subscribe(date => { console.log(date) })
  // }
}
