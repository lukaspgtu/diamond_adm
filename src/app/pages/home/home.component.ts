import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Title } from '@angular/platform-browser';
import { PlanService } from 'src/app/services/plan/plan.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { ExtractService } from 'src/app/services/extract/extract.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public totals: object;

  public activations: object[];

  public lastBonusPayment: object;

  public lastIncomePayment: object;

  public invoicesResume: object;

  public withdrawsResume: object;

  public barChartLabels = [];

  public barChartData = [{ data: [], label: 'Quantidade' }];

  public barChartType = 'bar';

  public barChartLegend = false;

  public barChartColors = [
    {
      backgroundColor: '#4F5467',
    }
  ];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor(
    private title: Title,
    private router: Router,
    private authSrv: AuthService,
    private userSrv: UserService,
    private transactionSrv: TransactionService,
    private planSrv: PlanService,
    private extractSrv: ExtractService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.title.setTitle('Home | Diamond Trading');

    this.spinner.show();

    // Verify Login
    this.authSrv.verifyLogin()
      .subscribe(res => {
        if (!res.success) {
          this.authSrv.logout();
          this.router.navigate(['/login']);
        }
        else {

          // Balance
          this.userSrv.balanceInfo()
            .subscribe(res => {
              this.totals = res.data;
            });

          // Activations
          this.transactionSrv.activations(5)
            .subscribe(res => {
              this.activations = res.data;
            });

          // Graphic
          this.planSrv.ratioActivePlans()
            .subscribe(res => {
              res.data.forEach(element => {
                this.barChartLabels.push(element['plan']);
                this.barChartData[0]['data'].push(element['total']);
              });
            });

          // Last Payment Bonus
          this.extractSrv.lastBonusPayment()
            .subscribe(res => {
              this.lastBonusPayment = res.data;
            });

          // Last Payment Income
          this.extractSrv.lastIncomePayment()
            .subscribe(res => {
              this.lastIncomePayment = res.data;
            });

          // Invoices Resume
          this.transactionSrv.invoicesResume()
            .subscribe(res => {
              this.invoicesResume = res.data;
            });

          // Withdraws Resume
          this.transactionSrv.withdrawsResume()
            .subscribe(res => {
              this.withdrawsResume = res.data;
            });
        }
      });
  }
}
