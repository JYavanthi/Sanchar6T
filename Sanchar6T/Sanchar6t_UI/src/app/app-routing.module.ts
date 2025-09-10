import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './auth/login-signup/login-signup.component';
import { MyProfileComponent } from './auth/my-profile/my-profile.component';
import { AgentSignupComponent } from './auth/agent-signup/agent-signup.component';
import { AuthGuard } from './auth/auth.guard';
import { PhonePayIntegrationComponent } from './phone-pay-integration/phone-pay-integration.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  { path: 'login', component: LoginSignupComponent },
  { path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'agentsignup', component: AgentSignupComponent },
  { path: '', loadChildren: () => import('./layout/layout-routing.module').then(m => m.LayoutRoutingModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule), canActivate: [AuthGuard] },
  { path: 'payment', component: PhonePayIntegrationComponent },
  { path:  'ticket', component: TicketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
