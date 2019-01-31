import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';
import { ElementsProvider } from '../../providers/elements/elements';
import { Button } from 'ionic-angular/components/button/button';

/**
 * Generated class for the ShowSkillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-skill',
  templateUrl: 'show-skill.html',
})
export class ShowSkillPage {
  public skillData:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loginRegProvider:LoginRegProvider,
    public ep:ElementsProvider,) {
   this.getSkill();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowSkillPage');
  }

  getSkill(){
    let _this = this;
    let logLoader = _this.ep.showLoader("Getting events...",true);
    this.loginRegProvider.getSkill().then(function(success:any){
      console.log("get events------------------->>>>>>>>");
      _this.skillData = success.data;
      _this.ep.hideLoader(logLoader);
      console.log(success);
      
    },function(err){
      _this.ep.hideLoader(logLoader);
      console.log("err in get events--------------->>>>>>>>>"+err);

    })
  }

  like(lc){
    lc.color ='primary';
    console.log("like");
  }

}
