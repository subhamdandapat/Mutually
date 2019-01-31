import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationPage } from './registration';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';
import { ElementsProvider } from '../../providers/elements/elements';

@NgModule({
  declarations: [
    RegistrationPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrationPage),
  ],
  providers:[
    LoginRegProvider,
    ElementsProvider
    ]
})
export class RegistrationPageModule {}
