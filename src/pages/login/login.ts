import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ElementsProvider } from '../../providers/elements/elements';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email:String;
  public password:String;
  public result:any=[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loginRegProvider:LoginRegProvider,
    public menuCtrl: MenuController,
    public ep:ElementsProvider) {
      this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //Go to Registration Page...
  gotoregis(){
    this.navCtrl.push('RegistrationPage');
  }

  //Login Api Call...
  userLogin(){
    let _this = this;
    if(_this.email == null || _this.email ==''){
      _this.ep.showAlert("Oopps","please provide your valid email");
    }
    else if(_this.password == null || _this.password ==''){
      _this.ep.showAlert("Oopps","please provide your valid password");;
    }
    else{
      let logdata = {
        email:this.email,
        password:this.password
      }
      let logLoader = _this.ep.showLoader("Logging in...",true);
      _this.loginRegProvider.userLogin(logdata).then(function(success:any){
        console.log("login success============>>>>>>>>>>>" + success);
        console.log(success);
        _this.result = success.data;
        console.log(_this.result.userDetails._id);
        localStorage.setItem('userId',_this.result.userDetails._id);

        _this.ep.hideLoader(logLoader);
        _this.navCtrl.setRoot('ConnectionPage');
      
      },function(err){
        _this.ep.hideLoader(logLoader);
        console.log("error in login==========>>>>>>>>>"+ err);
        alert("something went wrong, please check your credentials");
      })
    }

  }

}
