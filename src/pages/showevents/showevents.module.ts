import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoweventsPage } from './showevents';

@NgModule({
  declarations: [
    ShoweventsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoweventsPage),
  ],
})
export class ShoweventsPageModule {}
