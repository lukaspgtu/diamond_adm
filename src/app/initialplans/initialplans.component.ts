import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { AuthService } from '../services/user/auth.service';
import { AlertService } from '../services/alert/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-initialplans',
  templateUrl: './initialplans.component.html',
  styleUrls: ['./initialplans.component.css']
})
export class InitialplansComponent implements OnInit {
  private plans: any[] = [];
  private choice_plan: any[];
  private user: any;
  private plan_selected: any[];
  private dateRegister: any;
  private teste: any;


  constructor(
    title: Title,
    private service: UserService,
    private auth: AuthService,
    private alert: AlertService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {

    title.setTitle('Escolha seu plano | Diamond Trading')
  }

  ngOnInit() {

    this.teste = JSON.parse(localStorage.getItem("register"));

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);

    //Listar planos
    this.service.listPlans().subscribe(date => {
      this.plans = date.data
    })
  }

  //Mostrar detalhes plano
  viewPlan(id) {
    for (var i = 0; i < this.plans.length; i++) {
      if (this.plans[i].id == id) {
        var plan = this.plans[i];
        break;
      }
    }
    this.plan_selected = plan;
  }

  choicePlan(id) {
    for (var i = 0; i < this.plans.length; i++) {
      if (this.plans[i].id == id) {
        var plan = this.plans[i];
        break;
      }
    }
    this.choice_plan = plan.token;
    localStorage.setItem('plan', JSON.stringify(this.choice_plan));
  }

  register() {
    if (this.choice_plan == null) {
      this.alert.error('Você precisa selecionar um plano.')
    }
    else {
      return this.auth.register().subscribe(date => {
        if (date.success) {
          Swal.fire({
            type: 'success',
            title: 'Sucesso',
            text: date.message,
            showConfirmButton: false,
            timer: 3500
          })
          localStorage.removeItem('plan');
          localStorage.removeItem('register');
          localStorage.removeItem('manager');
          this.router.navigate(['/login'])
        }
      },
        errors => {
          this.alert.error('Não foi possível finalizar o cadastro, tente novamente mais tarde.')
        })
    }
  }
}
