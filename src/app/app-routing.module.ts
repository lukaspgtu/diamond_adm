import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './_guards/auth.guard'
import { RegisterComponent } from './register/register.component';
import { PlansComponent } from './pages/plans/plans.component';
import { NetworkComponent } from './pages/network/network.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ExtractComponent } from './extract/extract.component';
import { DirectsComponent } from './directs/directs.component';
import { CarreirplanComponent } from './carreirplan/carreirplan.component';
import { ClientsComponent } from './pages/clients/clients.component';

export const Approutes: Routes = [

  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register/:id', component: RegisterComponent
  },
  {
    path: '',
    component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'plans',
        component: PlansComponent
      },
      {
        path: 'network',
        component: NetworkComponent
      },
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: 'transactions',
        component: InvoicesComponent
      },
      {
        path: 'extract',
        component: ExtractComponent
      },
      {
        path: 'directs',
        component: DirectsComponent
      },
      {
        path: 'carreirplan',
        component: CarreirplanComponent
      },
    ]
  }
];
