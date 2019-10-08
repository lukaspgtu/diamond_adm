import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  public invoice: object;

  public plan: object;

  public client: object;

  public manager: object;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authSrv: AuthService,
    private transactionSrv: TransactionService,
  ) {

  }

  ngOnInit() {

    this.title.setTitle('Fatura | Diamond Trading');

    this.spinner.show();

    // Verify Login
    this.authSrv.verifyLogin()
      .subscribe(res => {
        if (!res.success) {
          this.authSrv.logout();
          this.router.navigate(['/login']);
        }
        else {

          this.route.params.subscribe((params: any) => {
            const token = params['token'];

            // Invoice Data
            this.transactionSrv.invoice(token)
              .subscribe(res => {
                if (res.success) {
                  this.invoice = res.data.invoice;
                  this.client = res.data.client;
                  this.manager = res.data.manager;
                  this.plan = res.data.plan;
                }
              });

          });
        }
      });

  }

}
