import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) { }

  // End open close
  ngOnInit() {

    $('#sidebarnav a').on('click', function (e) {
      if (!$(this).hasClass("active")) {
        // hide any open menus and remove all other classes
        $("ul", $(this).parents("ul:first")).removeClass("in");
        $("a", $(this).parents("ul:first")).removeClass("active");
        // open our new menu and add the open class
        $(this).next("ul").addClass("in");
        $(this).addClass("active");
      }
      else if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).parents("ul:first").removeClass("active");
        $(this).next("ul").removeClass("in");
      }
    });

    $('#sidebarnav >li >a.has-arrow').on('click', function (e) {
      e.preventDefault();
    });
  }

  logout() {
    this.alert.question('Deseja sair do sistema?', () => {
      this.auth.logout();
      this.router.navigate(['/login']);
    });
  }
}
