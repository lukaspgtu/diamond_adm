import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './_guards/auth.guard'
import { RegisterComponent } from './register/register.component';
import { PlansComponent } from './pages/plans/plans.component';
import { NetworkComponent } from './pages/network/network.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientComponent } from './pages/client/client.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { WithdrawsComponent } from './pages/withdraws/withdraws.component';

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
        path: 'client',
        component: ClientComponent
      },
      {
        path: 'client/documents',
        component: ClientComponent
      },
      {
        path: 'invoices',
        component: InvoicesComponent
      },
      {
        path: 'invoice',
        component: InvoiceComponent
      },
      {
        path: 'withdraws',
        component: WithdrawsComponent
      }
    ]
  }
];
