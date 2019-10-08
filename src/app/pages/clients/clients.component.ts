import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user/user.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public clients: object;

  public currentPage: number = 1;

  constructor(
    private title: Title,
    private spinner: NgxSpinnerService,
    private router: Router,
    private authSrv: AuthService,
    private userSrv: UserService
  ) {

  }

  ngOnInit() {

    this.title.setTitle('Clientes | Diamond Trading');

    this.spinner.show();

    // Verify Login
    this.authSrv.verifyLogin()
      .subscribe(res => {
        if (!res.success) {
          this.authSrv.logout();
          this.router.navigate(['/login']);
        }
        else {

          // Clients
          this.userSrv.clients()
            .subscribe(res => {
              this.clients = res.data;
            });
        }
      });
  }

}
