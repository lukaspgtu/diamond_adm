import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../services/alert/alert.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../services/loading/loading.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlanService } from 'src/app/services/plan/plan.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  public plans: any;

  constructor(
    private title: Title,
    private spinner: NgxSpinnerService,
    private router: Router,
    private authSrv: AuthService,
    private plansSrv: PlanService
  ) {

  }

  ngOnInit() {

    this.title.setTitle('Planos | Diamond Trading');

    this.spinner.show();

    // Verify Login
    this.authSrv.verifyLogin()
      .subscribe(res => {
        if (!res.success) {
          this.authSrv.logout();
          this.router.navigate(['/login']);
        }
        else {

          // Plans
          this.plansSrv.plans()
            .subscribe(res => {
              this.plans = res.data;
            });
        }

      });

  }

}
