// import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './register/register.component';
import { InitialplansComponent } from './initialplans/initialplans.component';
import { NgxMaskModule } from 'ngx-mask'
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/user/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { MoneyPipe } from './_pipes/money.pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { PlansComponent } from './pages/plans/plans.component';
import { NetworkComponent } from './pages/network/network.component';
import { NetworkService } from './services/user/network.service';
import { InvoicesComponent } from './invoices/invoices.component';
import { WithdrawsComponent } from './withdraws/withdraws.component';
import { ExtractComponent } from './extract/extract.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DirectsComponent } from './directs/directs.component'
import { ReactiveFormsModule } from '@angular/forms';
import { CarreirplanComponent } from './carreirplan/carreirplan.component';
import { ChartsModule } from 'ng2-charts';
import { ClientsComponent } from './pages/clients/clients.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    NavigationComponent,
    SidebarComponent,
    BreadcrumbComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    RegisterComponent,
    InitialplansComponent,
    MoneyPipe,
    PlansComponent,
    NetworkComponent,
    InvoicesComponent,
    WithdrawsComponent,
    ExtractComponent,
    DirectsComponent,
    CarreirplanComponent,
    ClientsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    PerfectScrollbarModule,
    ChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['localhost'],
        blacklistedRoutes: ['']
      }
    }),
    NgxMaskModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot(Approutes, { useHash: false })
  ],
  providers: [UserService, AuthService, NetworkService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
