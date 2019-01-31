import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';
import { SocketProvider } from '../../providers/socket/socket';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  public userData: any=[];
  userId:any;
  isReadonly: boolean = true;
  public img;
  public trueimage='https://via.placeholder.com/350x150';
  public preimageid="https://iontest.herokuapp.com/image/";
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loginRegProvider:LoginRegProvider,
    public menuCtrl: MenuController,
    public socketProvider:SocketProvider) {
      this.menuCtrl.enable(true);
    console.log(this.userData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.userId = localStorage.getItem('userId');
    console.log(this.userId);
    if(this.userId){
      this.socketProvider.connectSocket(this.userId);
      this.getInfo();
    }
  }

  //get user details using id....
  getInfo(){
    let _this = this;
    this.loginRegProvider.getUserDetails(this.userId).then(function(success:any){
      console.log("get user details in dashboard==========>>>>>>>>>");
      console.log(success);
      _this.userData = success.data.userDetails;
      localStorage.setItem("userName",_this.userData.username);
      console.log(_this.userData.username)
      // _this.trueimage=_this.preimageid+_this.userData.filename;
    },function(err){
      console.log("error in dashboard===========>>>>>");
      console.log(err);
    })
  }

  //Go to profile Edit...
  gotoEdit(){
    this.navCtrl.push('EditprofilePage');
  }

}
