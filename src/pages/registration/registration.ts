import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';
import { ElementsProvider } from '../../providers/elements/elements';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from 'ionic-angular/platform/platform';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
  providers: [GooglePlus]
})
export class RegistrationPage {
  isLoggedIn: boolean;
  imageUrl: any;
  userId: any;
  givenName: any;
  familyName: any;
  displayName: any;

  public userName:String;
  public email:String;
  public phoneNumber:Number;
  public password:String;
  public deviceid:any;

  public userdata:any;
  
  // public data:any={};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loginRegProvider:LoginRegProvider,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public ep:ElementsProvider,
    public device: Device,
    public fb: Facebook,
    private googlePlus: GooglePlus,
    private uniqueDeviceID: UniqueDeviceID) {
      this.menuCtrl.enable(false);
      // this.data.userName = '';
      // this.data.email = '';
      // this.data.phoneNumber = '';
      // this.data.password = '';
  //     this.uniqueDeviceID.get()
  // .then((uuid: any) => console.log(uuid))
  // .catch((error: any) => console.log(error));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
    console.log('Device UUID is: ' + this.device);
    console.log(this.device);
    // this.deviceid = this.device.uuid;
    // console.log(this.device.uuid);
    
  }

  //Go to LoginPage...
  gotoLogin(){
    this.navCtrl.push('LoginPage');
  }

  //User registration...
  registerUser()
  {
    let _this = this;

    let mydata = {
      username:this.userName,
      phone:this.phoneNumber,
      email:this.email,
      password:this.password,
      deviceId:'0'
    }

    if(_this.email == null || _this.email ==''){
      _this.ep.showAlert("Oopps","please provide your valid email");
    }
    else if(_this.password == null || _this.password ==''){
      _this.ep.showAlert("Oopps","please provide your valid password");;
    }
    else if(_this.userName == null || _this.userName ==''){
      _this.ep.showAlert("Oopps","please provide your valid userName");
    }
    // else if(_this.phoneNumber == null || _this.phoneNumber == NaN){
    //   _this.ep.showAlert("Oopps","please provide your valid PhoneNumber");
    // }
    else{

    let regLoader = _this.ep.showLoader('Registering',true);
  
    this.loginRegProvider.register(mydata).then(function(success:any){
      console.log("registration success==========>>>>>>>>"+ success);
      console.log(success);
      _this.ep.hideLoader(regLoader);
      _this.userdata = success.data;
      console.log("userdata-------------->>>>>>>>>");
      console.log(_this.userdata.details[0]._id);
      _this.navCtrl.setRoot('DashboardPage');
      localStorage.setItem('userId',_this.userdata.details[0]._id);
      _this.ep.showAlert("Congrats...","registration Successfull");
      // if(_this.userdata.status == 'error'){
      //   _this.ep.showAlert("Sorry","Email is already registered");
      //   _this.ep.hideLoader(regLoader);
      // }
      // else{
      //   localStorage.setItem('userId',_this.userdata.id);
      //   console.log(_this.userdata.id);
      //   _this.ep.hideLoader(regLoader);
      //   _this.navCtrl.setRoot('DashboardPage');
      //   _this.ep.showAlert("Congrats...","registration Successfull");
      // }
     
    },function(err){
      _this.ep.hideLoader(regLoader);
      _this.ep.showAlert("Oopps...","You are already registered with that Email");
      console.log("error in registration========>>>>>" + err);
    })
  }
}

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  //Facebook login....
  loginAction(){

    // Login with permissions
    this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
    .then( (res: FacebookLoginResponse) => {
      console.log("res==========>>>>>>"+ res);

        // The connection was successful
        if(res.status == "connected") {

            // Get user ID and Token
            var fb_id = res.authResponse.userID;
            var fb_token = res.authResponse.accessToken;

            // Get user infos from the API
            this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {
              console.log("fb user data ============>>>>>>>>>>" + user);

              // this.userdata = user;
                // Get the connected user details
                var gender    = user.gender;
                var birthday  = user.birthday;
                this.userName = user.name;
                this.email = user.email;

                console.log("=== USER INFOS ===");
                console.log("Gender : " + gender);
                console.log("Birthday : " + birthday);
                console.log("Name : " + name);
                console.log("Email : " + this.email);

                // => Open user session and redirect to the next page

            });

        } 
        // An error occurred while loging-in
        else {

            console.log("An error occurred...");

        }

    })
    .catch((e) => {
        console.log('Error logging into Facebook', e);
    });
  }

  //Google login....
  googlelogin() {
    this.googlePlus.login({})
      .then(res => {
        console.log("google login responce==========>>>>>>>>");
        console.log(res);
        this.userName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;

        this.isLoggedIn = true;
      })
      .catch(err => console.error(err));
  }
  
}
