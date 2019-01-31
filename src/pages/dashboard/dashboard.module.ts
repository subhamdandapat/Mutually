import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
  ],
  providers:[
    LoginRegProvider
  ]
})
export class DashboardPageModule {}
