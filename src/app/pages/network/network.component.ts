import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '../../services/loading/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  network: any;
  people_network_r: any;
  points_network_r: any;
  people_network_l: any;
  points_network_l: any;
  search: any;

  constructor(private title: Title,
    private loading: LoadingService,
    private spinner: NgxSpinnerService,
    private alert: AlertService) { }

  ngOnInit() {

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000)

    this.title.setTitle('Rede Binária | Diamond Trading')


  }
}
