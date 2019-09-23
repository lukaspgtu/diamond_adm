import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PlanService } from '../../services/user/plan.service';
import { AlertService } from '../../services/alert/alert.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  private plans: any[] = [];
  private choice_plan: any[];
  private plan_selected: any[];
  private user: any;
  private planOpen: any;
  private planUser: any;
  private percent_plan: any

  constructor(private title: Title,
    private service: UserService,
    private servicePlan: PlanService,
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private loading: LoadingService) {
  }

  ngOnInit() {
    this.title.setTitle('Planos | Diamond Trading');

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);

    //Plano usuario
    this.service.dataPlan().subscribe(date => {
      this.planUser = date
      this.percent_plan = date.gain_percent
    });

    //Obter fatura em aberto
    this.service.paymentPlan().subscribe(date => {
      if (date.length > 0) {
        this.planOpen = date
      }
      else {
        this.planOpen = null
      }
    });

    //Listar planos disponiveis para usuario
    this.service.availablePlan().subscribe(date => {
      this.plans = date
    });

    //Dados Usuario
    this.service.viewUser().subscribe(date => {
      this.user = date.data
    });
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
    Swal.fire({
      title: 'Atenção',
      text: "Deseja realmente escolher esse plano ?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.loading.show('Gerando Transação...')
        this.servicePlan.upgradePlan(id).subscribe(res => {
          if (res.success) {
            this.alert.success(res.message)
            this.loading.hide()
            this.service.paymentPlan().subscribe(date => {
              this.planOpen = date
            })
          }
          else {
            this.alert.error(res.message)
            console.log(res)
          }
        })
      }
    })
  }

  choicePlanOpen() {
    Swal.fire({
      title: 'Atenção',
      text: "Se você escolher outro plano, essa faturá será cancelada, deseja realmente alterar ?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.planOpen = null
      }
    })
  }
}