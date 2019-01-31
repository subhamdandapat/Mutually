import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginRegProvider } from '../providers/login-reg/login-reg';
import { DashboardPage } from '../pages/dashboard/dashboard';
import {MyinterestPage} from '../pages/myinterest/myinterest';
import {ShowinterestPage} from '../pages/showinterest/showinterest';
import {AddeventPage} from '../pages/addevent/addevent';
import {ShoweventsPage} from '../pages/showevents/showevents';
import {RequestlistPage} from '../pages/requestlist/requestlist';
import {FriendlistPage} from '../pages/friendlist/friendlist';



import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  userId:any;
  rootPage:any = '';
  data:any={};

  pages: Array<{ title: string, component: any }>;

  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform,
    public menuCtrl: MenuController,
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public logReg:LoginRegProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


    this.userId = localStorage.getItem('userId');
    console.log("app component================>>>>>>" + this.userId);
    
    if (
      localStorage.getItem("userId") != undefined &&
      localStorage.getItem("userId").length != 0
    ) {
      this.getInfo();
      this.rootPage = "DashboardPage";
    } else {
      localStorage.setItem("userId", "");
      this.rootPage = HomePage;
    }

       // used for an example of ngFor and navigation
  this.pages = [
    { title: 'Profile', component: 'DashboardPage' },
    { title: 'Connections', component: 'ConnectionPage' },
    { title: 'Add interest', component: 'MyinterestPage' },
    { title: 'Show interest', component: 'ShowinterestPage' },
    { title: 'Add Event', component: 'AddeventPage' },
    { title: 'Show Events', component: 'ShoweventsPage' },
    { title: 'Add Skill', component: 'AddskillPage' },
    { title: 'Show Skill', component: 'ShowSkillPage' },
    { title: 'Request List', component: 'RequestlistPage' },
    { title: 'Friend List', component: 'FriendlistPage' },
    
    ];
  }

  getInfo(){
    let _this = this;
    this.logReg.getUserDetails(this.userId).then(function(success){
      console.log("get success in app component==========>>>>>>>>");
      console.log(success);
      _this.data = success;
      console.log(_this.data.email);

    },function(err){
      console.log("error in app component===========>>>>>>>");
      console.log(err);
    })
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }


   // sign out current user
   signOut() {
    localStorage.removeItem("userId");
    this.nav.setRoot(HomePage);
    // this.ep.showAlert("Logout success", "Thank you for using our service.");
    this.menuCtrl.close();
  }
}

