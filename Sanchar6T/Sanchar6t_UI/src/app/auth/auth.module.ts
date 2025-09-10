import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { SharedModule } from '../shared/shared.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AgentSignupComponent } from './agent-signup/agent-signup.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LoginSignupComponent,
    MyProfileComponent,
    AgentSignupComponent,
    
    
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LoginSignupComponent
  ]
})
export class AuthModule { }