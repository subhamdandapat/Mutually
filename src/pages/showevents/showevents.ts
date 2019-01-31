import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';
import { ElementsProvider } from '../../providers/elements/elements';

/**
 * Generated class for the ShoweventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showevents',
  templateUrl: 'showevents.html',
})
export class ShoweventsPage {
  public eventsData:any=[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loginRegProvider:LoginRegProvider,
    public ep:ElementsProvider,) {
      this.getEvents();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoweventsPage');
  }

  getEvents(){
    let _this = this;
    let logLoader = _this.ep.showLoader("Getting events...",true);
    this.loginRegProvider.getevents().then(function(success:any){
      console.log("get events------------------->>>>>>>>");
      _this.eventsData = success.data;
      _this.ep.hideLoader(logLoader);
      console.log(success);
      
    },function(err){
      _this.ep.hideLoader(logLoader);
      console.log("err in get events--------------->>>>>>>>>"+err);

    })
  }
  moveToAddev(){
    this.navCtrl.push('AddeventPage');
  }

}
