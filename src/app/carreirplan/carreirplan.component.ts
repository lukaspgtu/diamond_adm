import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PlanService } from '../services/user/plan.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-carreirplan',
  templateUrl: './carreirplan.component.html',
  styleUrls: ['./carreirplan.component.css']
})
export class CarreirplanComponent implements OnInit {
  carreirPlan: any;
  teste: number = 100;
  constructor(private title: Title,
    private service: PlanService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.title.setTitle('Plano de Carreira | Diamond Trading');
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    //Listar carreira de planos
    this.service.carreirPlan().subscribe(res => {
      this.carreirPlan = res
    })
  }
}
