import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-withdraws',
  templateUrl: './withdraws.component.html',
  styleUrls: ['./withdraws.component.css']
})
export class WithdrawsComponent implements OnInit {

  public date_begin: NgbDateStruct;
  public date_end: NgbDateStruct;
  public date_min: NgbDateStruct;
  public date_max: NgbDateStruct;

  constructor() {
    const date = new Date();
    const date_min: NgbDateStruct = { year: 2019, month: 6, day: 25 };
    const today: NgbDateStruct = { year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate() }
    this.date_begin = this.date_min = date_min;
    this.date_end = this.date_max = today;
  }

  ngOnInit() {

  }

}
