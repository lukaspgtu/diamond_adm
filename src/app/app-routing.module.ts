import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guards/auth.guard'
import { PlansComponent } from './pages/plans/plans.component';
import { NetworkComponent } from './pages/network/network.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientComponent } from './pages/client/client.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { WithdrawsComponent } from './pages/withdraws/withdraws.component';
import { AdditionalScoreComponent } from './pages/additional-score/additional-score.component';
import { GainLimitsComponent } from './pages/gain-limits/gain-limits.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { AccountComponent } from './pages/account/account.component';
import { PasswordComponent } from './pages/password/password.component';
import { MasterComponent } from './pages/master/master.component';
import { SystemComponent } from './pages/system/system.component';
import { SupportComponent } from './pages/support/support.component';

export const Approutes: Routes = [

  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
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
        path: 'support',
        component: SupportComponent
      },
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: 'client/:token',
        component: ClientComponent
      },
      {
        path: 'client/documents',
        component: ClientComponent
      },
      {
        path: 'additionalScore',
        component: AdditionalScoreComponent
      },
      {
        path: 'gainLimits',
        component: GainLimitsComponent
      },
      {
        path: 'documents',
        component: DocumentsComponent
      },
      {
        path: 'invoices',
        component: InvoicesComponent
      },
      {
        path: 'invoice/:token',
        component: InvoiceComponent
      },
      {
        path: 'withdraws',
        component: WithdrawsComponent
      },
      {
        path: 'settings/account',
        component: AccountComponent
      },
      {
        path: 'settings/password',
        component: PasswordComponent
      },
      {
        path: 'settings/master',
        component: MasterComponent
      },
      {
        path: 'settings/system',
        component: SystemComponent
      }
    ]
  }
];
