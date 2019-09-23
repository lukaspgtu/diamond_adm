import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NetworkService } from '../services/user/network.service';
import { LoadingService } from '../services/loading/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ExtractService } from '../services/user/extract.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  transactions: any = [];
  begin: any = null;
  end: any = null;
  type: any = null;
  status: any = null;
  date_begin: NgbDateStruct;
  date_end: NgbDateStruct;
  today = this.calendar.getToday();
  paginaAtual = 1;
  begin_min: any;
  begin_max: any;
  end_min: any;
  end_max: any;
  value_filter: any;
  transaction_selected:any;
  constructor(
    private calendar: NgbCalendar,
    private spinner: NgxSpinnerService,
    private title: Title,
    private extractService: ExtractService,
    private loading:LoadingService
  ) {
    var date = new Date();
    this.end_max = this.begin_max = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
    this.end_min = this.begin_min = new NgbDate(2019, 6, 25)
  }

  ngOnInit() {

    this.title.setTitle('Extract | Diamond Trading')
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);

    //Listar todos as transações
    this.extractService.listTransactions().subscribe(data => {
      this.transactions = data
    })
  }
  //Mostrar Detalhes da transação selecionada
  viewTransaction(id) {
    this.transaction_selected = ''   
    this.loading.show('Carregando...')
    this.extractService.viewTransaction(id).subscribe(res => {
      this.transaction_selected = res      
      this.loading.hide()
    })
  }

  checkBegin() {
    if (this.date_end == null) {
      this.end_min = new NgbDate(this.date_begin.year, this.date_begin.month, this.date_begin.day)
      setTimeout(() => {
        (<HTMLInputElement>document.getElementById('button_end')).click()
      });
    }
    else {
      this.begin = `${this.date_begin.year}-${this.date_begin.month}-${this.date_begin.day}`;
      this.end = `${this.date_end.year}-${this.date_end.month}-${this.date_end.day}`;

      const filters = this.generateFilters();

      this.extractService.listTransactions(filters).subscribe(data => {
        this.transactions = data
      });
    }
  }

  checkEnd() {
    if (this.date_begin == null) {
      this.begin_max = new NgbDate(this.date_end.year, this.date_end.month, this.date_end.day)
      setTimeout(() => {
        (<HTMLInputElement>document.getElementById('button_begin')).click()
      });
    }
    else {
      this.begin = `${this.date_begin.year}-${this.date_begin.month}-${this.date_begin.day}`;
      this.end = `${this.date_end.year}-${this.date_end.month}-${this.date_end.day}`;

      const filters = this.generateFilters();

      this.extractService.listTransactions(filters).subscribe(data => {
        this.transactions = data
      });
    }
  }

  filterByType(type) {
    this.type = type;

    if (type == 1) this.value_filter = 'Pagamento';
    else this.value_filter = 'Saque';

    const filters = this.generateFilters();

    this.extractService.listTransactions(filters).subscribe(data => {
      this.transactions = data
    });
  }

  filterByStatus(status) {
    this.status = status;

    const filters = this.generateFilters();

    this.extractService.listTransactions(filters).subscribe(data => {
      this.transactions = data;
    });
  }

  filterAll() {
    this.type = null;
    this.value_filter = null;

    const filters = this.generateFilters();

    this.extractService.listTransactions(filters).subscribe(data => {
      this.transactions = data;
    });
  }

  generateFilters() {
    var filters: string = '';
    if (this.begin !== null && this.end !== null) {
      filters += `begin=${this.begin}&end=${this.end}`;
      if (this.type !== null) {
        filters += `&type=${this.type}`;
      }
      if (this.status !== null) {
        filters += `&status=${this.status}`;
      }
    }
    else {
      if (this.type !== null) {
        filters += `type=${this.type}`;
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

}
