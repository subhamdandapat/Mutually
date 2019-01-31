import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';
import { SocketProvider } from '../../providers/socket/socket';

/**
 * Generated class for the ConnectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connection',
  templateUrl: 'connection.html',
})
export class ConnectionPage {
  public users:any=[];
  public preimageid="https://iontest.herokuapp.com/image/";
  public userId:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public loginRegProvider:LoginRegProvider,
    public socketProvider:SocketProvider) {
    this.menuCtrl.enable(true);

    this.userId = localStorage.getItem("userId");
    if(this.userId){
      this.socketProvider.connectSocket(this.userId);
      this.getAllUser();
     
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionPage');
  }

  // Get All User List...
  getAllUser(){
    let _this = this;
    let uid ={
      userId:this.userId
    }
    this.loginRegProvider.getAllUser(uid).then(function(success:any){
      console.log("all user list---------------->>>>>>>>>>>");
      console.log(success);
      _this.users = success.data.userDetails;
      console.log(_this.users);
    },function(err){
      console.log("error to get all user------------>>>>>>>>>>"+err);
    })
  }

  //Go to details page ...
  showDetails(userid){
    console.log(userid);
    this.navCtrl.push('ViewprofilePage',{userId:userid});
  }

}
