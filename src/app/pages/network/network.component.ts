import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NetworkService } from '../../services/user/network.service';
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
    private service: NetworkService,
    private loading: LoadingService,
    private spinner: NgxSpinnerService,
    private alert: AlertService) { }

  ngOnInit() {

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000)

    this.title.setTitle('Rede Binária | Diamond Trading')

    //Dados iniciais
    this.service.netWorkPrimary().subscribe(res => {
      this.network = res.data
      this.people_network_r = this.network[0].right_number_users
      this.points_network_r = this.network[0].right_points
      this.people_network_l = this.network[0].left_number_users
      this.points_network_l = this.network[0].left_points
    })

  }
  changeNetWork(username) {
    this.clearNetwork()
    this.service.changeNetWork(username).subscribe(res => {
      if (res.success) {
        this.loading.hide()
        this.network = res.data
        this.people_network_r = this.network[0].right_number_users
        this.points_network_r = this.network[0].right_points
        this.people_network_l = this.network[0].left_number_users
        this.points_network_l = this.network[0].left_points
      }
      else {
        this.alert.error('Não foi possível renderizar.')
      }
    })
  }

  clearNetwork() {
    this.network.forEach(element => {
      if (element != null) {
        this.loading.show('Renderizando...')
        element.username = null
        element.img = null
        element.plan = null
      }
    });
  }
  searchNetWork() {
    this.search = (<HTMLInputElement>document.getElementById('search')).value
    this.loading.show('Procurando...')

    if (this.search == '') {
      this.alert.error('Você precisa digitar um username.')
    }
    else {
      this.service.changeNetWork(this.search).subscribe(res => {
        if (res.success) {
          this.clearNetwork()
          this.loading.hide()
          this.network = res.data
          this.people_network_r = this.network[0].right_number_users
          this.points_network_r = this.network[0].right_points
          this.people_network_l = this.network[0].left_number_users
          this.points_network_l = this.network[0].left_points
        }
        else {
          // this.loading.hide()
          this.alert.error(res.message)
        }
      })
    }
  }
}
