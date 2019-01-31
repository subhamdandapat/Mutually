import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditprofilePage } from './editprofile';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';
import { ElementsProvider } from '../../providers/elements/elements';

@NgModule({
  declarations: [
    EditprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(EditprofilePage),
  ],
  providers:[
    LoginRegProvider,
    ElementsProvider
  ]
})
export class EditprofilePageModule {}
