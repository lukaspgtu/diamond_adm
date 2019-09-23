import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../../services/alert/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigHelper } from '../../helpers/ConfigHelper';
import { AuthService } from '../../services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private plan: any;
  private user: any;
  private blocked_money: any; // Guardar saldo bloqueado usuario
  private key_binary: any; // Mostrar lado chave escolhido
  private link: any
  private is_qualified: any;
  keyForm: FormGroup

  constructor(private title: Title,
    private userSrv: UserService,
    private fb: FormBuilder,
    private alert: AlertService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private router: Router
  ) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Blue', 'Green', 'Yellow', 'Beige', 'White', 'Black', 'Cota Premium', 'Two', 'Three', 'Combo Bright'];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [
    { data: [120, 150, 180, 90, 80, 83, 20, 30, 40, 1], label: 'Quantidade' }
  ];
  public barChartColors = [
    {
      backgroundColor: '#DCB05E',
    }
  ];


  ngOnInit() {
    this.title.setTitle('Home | Diamond Trading')

    this.keyForm = this.fb.group({
      key: ['']
    })


    //Dados Usuario
    this.userSrv.viewUser().subscribe(date => {
      //Verificar se usuario esta logado
      if (!date.success) {
        this.auth.logout();
        this.router.navigate(['/login']);
      }
      else {
        this.user = date.data
        this.blocked_money = date.blocked_balance
        this.key_binary = date.data.binary_key
        this.link = `${ConfigHelper.link}/register/${date.data.token}`
      }
    })

    //Dados Plano usuario
    this.userSrv.dataPlan().subscribe(date => {
      this.plan = date
      this.is_qualified = this.plan.is_qualified
    })

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  changeKey(key) {
    this.userSrv.changeKey(key).subscribe(date => {

      if (date.success) {
        this.alert.toast(date.message)
      }
      else {

      }
    })
  }

  copyLink(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.alert.toast('Link copiado com sucesso!');
  }
}
