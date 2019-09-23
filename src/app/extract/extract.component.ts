import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';
import { NgbDate, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ExtractService } from '../services/user/extract.service';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.css']
})
export class ExtractComponent implements OnInit {

  extracts: any = [];
  begin: any = null;
  end: any = null;
  type: any = null;
  date_begin: NgbDateStruct;
  date_end: NgbDateStruct;
  today = this.calendar.getToday();
  paginaAtual = 1;
  begin_min: any;
  begin_max: any;
  end_min: any;
  end_max: any;
  value_filter: any;
  extract_selected: any

  constructor(private calendar: NgbCalendar,
    private spinner: NgxSpinnerService,
    private loading: LoadingService,
    private title: Title,
    private extractService: ExtractService) {
    var time = new Date();
    this.end_max = this.begin_max = new NgbDate(time.getFullYear(), time.getMonth() + 1, time.getDate())
    this.end_min = this.begin_min = new NgbDate(2019, 6, 25)
  }

  ngOnInit() {

    this.title.setTitle('Extract | Diamond Trading')
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);

    this.extractService.listExtract().subscribe(data => {
      this.extracts = data
    })
  }

  //Mostrar Detalhes do extrato selecionado
  viewExtract(id) {
    this.extract_selected = ''   
    this.loading.show('Carregando...')
    this.extractService.viewExtract(id).subscribe(res => {
      this.extract_selected = res      
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

      this.extractService.listExtract(filters).subscribe(data => {
        this.extracts = data
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

      this.extractService.listExtract(filters).subscribe(data => {
        this.extracts = data
      });
    }
  }

  filterByType(type) {
    this.type = type;

    if (type == 1) this.value_filter = 'Bônus';
    else if (type == 2) this.value_filter = 'Indicações';
    else if (type == 3) this.value_filter = 'Rendimentos';

    const filters = this.generateFilters();

    this.extractService.listExtract(filters).subscribe(data => {
      this.extracts = data
    });
  }

  filterAll() {
    this.type = null;
    this.value_filter = null;

    const filters = this.generateFilters();

    this.extractService.listExtract(filters).subscribe(data => {
      this.extracts = data;
    });
  }

  generateFilters() {
    var filters: string = '';
    if (this.begin !== null && this.end !== null) {
      filters += `begin=${this.begin}&end=${this.end}`;
      if (this.type !== null) {
        filters += `&type=${this.type}`;
      }
    }
    else {
      if (this.type !== null) {
        filters += `type=${this.type}`;
      }
    }
    return filters;
  }
}
