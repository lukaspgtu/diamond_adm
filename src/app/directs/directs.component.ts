import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '../services/loading/loading.service';
import { ExtractService } from '../services/user/extract.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../services/alert/alert.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-directs',
  templateUrl: './directs.component.html',
  styleUrls: ['./directs.component.css']
})
export class DirectsComponent implements OnInit {
  allDirects: any = [];
  userDirect: any = null;
  search: any;
  side: any = null;
  status: any = null;
  statusForm: FormGroup
  value_filter: any = null

  constructor(private title: Title,
    private spinner: NgxSpinnerService,
    private loading: LoadingService,
    private extractService: ExtractService,
    private alert: AlertService,
    private fb: FormBuilder, ) { }

  ngOnInit() {

    this.title.setTitle('Diretos | Diamond Trading')
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);

    //Listar todos diretos
    this.extractService.listDirects().subscribe(res => {
      this.allDirects = res
    })
  }

  //Listar por usuername
  listUser() {
    this.userDirect = (<HTMLInputElement>document.getElementById('search')).value
    if (this.userDirect.length > 0) {
      this.loading.show('Procurando...')
      const filter = this.generateFilters();
      this.extractService.listDirects(filter).subscribe(res => {
        this.allDirects = res
        this.loading.hide()
        if (this.allDirects == '') {
          this.alert.error('Username não encontrado!')
        }
      })
    }
  }

  choiceSide(side) {
    this.value_filter = side
    this.side = side
    this.loading.show('Procurando...')
    const filter = this.generateFilters();
    this.extractService.listDirects(filter).subscribe(res => {
      this.allDirects = res
      this.loading.hide()
    })
  }

  choiceStatus(status) {
    this.value_filter = status
    this.status = status
    this.loading.show('Procurando...')
    const filter = this.generateFilters();
    this.extractService.listDirects(filter).subscribe(res => {
      this.allDirects = res
      this.loading.hide()
    })
  }

  generateFilters() {
    var filters: string = '';
    if (this.userDirect !== null) {
      filters += `username=${this.userDirect}`;
      if (this.side !== null) {
        filters += `&side=${this.side}`;
        if (this.status !== null) {
          filters += `&status=${this.status}`;
        }
      }
    }
    else {
      if (this.side !== null) {
        filters += `side=${this.side}`;
        if (this.status !== null) {
          filters += `&status=${this.status}`;
        }
      }
      else {
        if (this.status !== null) {
          filters += `status=${this.status}`;
        }
      }
    }
    return filters;
  }

  clearFliters() {
    (<HTMLInputElement>document.getElementById('rdo-1')).checked = false
    this.loading.show('Procurando...')
    this.userDirect = null
    this.side = null
    this.status = null
    this.value_filter = null
    this.extractService.listDirects().subscribe(res => {
      this.allDirects = res
      this.loading.hide()
    })
  }
}
