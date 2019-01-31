import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';
import { ElementsProvider } from '../../providers/elements/elements';

/**
 * Generated class for the MyinterestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myinterest',
  templateUrl: 'myinterest.html',
})

export class MyinterestPage {
  public maincategories:any;
  public subcategories:any;
  public type:any;
  description:any;
  indoors:any;
  outdoors:any;
  citylife:any;
  surburbanlife:any;
  rural:any;
  warm:any;
  cold:any;
  introvert:any;
  extrovert:any;
  extrovertedintrovert:any;
  vphActive:any;
  sphActive:any;
  nphActive:any;
  messy:any;
  omessy:any;
  clean:any;
  music:any;
  food:any;
  book:any;
  pets:any;
  tvShows:any;
  season:any;
  other:any;
  public prefData:any;
  public favdata:any;
  otherData:any;
  userId:any;
  // public isInterest=false;
  public valofinterest:any;
  indata:any=[];
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loginRegProvider:LoginRegProvider,
    public ep:ElementsProvider) {
      console.log("constructor---------------------");
      this.userId = localStorage.getItem('userId');
      this.valofinterest = localStorage.getItem('interestKey')
      if(this.userId &&  this.valofinterest=='true'){
        this.getInterests();
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyinterestPage');
  }

  ionViewDidEnter(){
    console.log("enter-----------------------------");
    if(this.valofinterest == 'true'){
     
    }
  }

  //Get previous interest............
  getInterests(){

    let _this = this;
    console.log("true------------------------------------------");
    let logLoader = _this.ep.showLoader("Updating interests...",true);
    this.loginRegProvider.getusersInteresr(this.userId).then(function(success:any){
      console.log(success);
      _this.indata = success.data.interestDetails;
      _this.other = _this.indata.interest['0'];
      _this.type = _this.indata.type;
      _this.description = _this.indata.hobby;
      _this.maincategories = _this.indata.mainCategory;
      _this.subcategories = _this.indata.subCategory;

      
      _this.indoors = _this.indata.personType['0'];
      _this.outdoors = _this.indata.personType['1'];
      _this.citylife = _this.indata.personType['2'];
      _this.surburbanlife = _this.indata.personType['3'];
      _this.rural = _this.indata.personType['4'];
      _this.warm = _this.indata.personType['5'];
      _this.cold = _this.indata.personType['6'];
      _this.introvert = _this.indata.personType['7'];
      _this.extrovert = _this.indata.personType['8'];
      _this.extrovertedintrovert = _this.indata.personType['9'];
      _this.vphActive = _this.indata.personType['10'];
      _this.sphActive = _this.indata.personType['11'];
      _this.nphActive = _this.indata.personType['12'];
      _this.messy = _this.indata.personType['13'];
      _this.omessy = _this.indata.personType['14'];
      _this.clean = _this.indata.personType['15'];
      
            _this.music = _this.indata.favourite['0'];
            _this.food = _this.indata.favourite['1'];
            _this.book = _this.indata.favourite['2'];
            _this.pets = _this.indata.favourite['3'];
            _this.tvShows = _this.indata.favourite['4'];
            _this.season = _this.indata.favourite['5'];
            _this.ep.hideLoader(logLoader);
    },function(err){
      _this.ep.hideLoader(logLoader);
      console.log("err-------------------------------------------" + err);
      alert("somthing wrong===================>>>>>>>>>>>>>>>");
    })
  }

  //Save users interest...
  saveUserInterests()
  {
    if(this.valofinterest == 'true'){
      let _this = this;
      this.prefData=[this.indoors,this.outdoors,this.citylife,this.surburbanlife,
        this.rural,this.warm,this.cold,this.introvert,
      this.extrovert,this.extrovertedintrovert,this.vphActive,this.sphActive,this.nphActive,
      this.messy,this.omessy]
  
      this.favdata = [this.music,this.food,this.book,this.pets,this.tvShows,this.season]
  
      this.otherData = [this.other]
        
      let interestData = {
        mainCategory:this.maincategories,
        subCategory:this.subcategories,
        type:this.type,
        hobby:this.description,
        interest:this.otherData,
        personType:this.prefData,
        favourite:this.favdata,
        userId:this.userId
      }
      let logLoader = _this.ep.showLoader("Updating interests...",true);
      console.log("interest data ----------------------------<>>>>>>>>>>>>>>>>>>");
      console.log(interestData);
      this.loginRegProvider.updateInterest(interestData).then(function(success:any){
        console.log("interest success data--------------->>>>>>>>>");
        console.log(success);
        _this.valofinterest = 'true';
        localStorage.setItem('interestKey',_this.valofinterest);
        console.log(_this.valofinterest);
        _this.ep.hideLoader(logLoader);
        _this.ep.showAlert("Data Saved","successfully");
        _this.navCtrl.setRoot('ConnectionPage');
  
      },function(err){
        _this.ep.hideLoader(logLoader);
        console.log("err-------------------------------------------" + err);
        alert("somthing wrong===================>>>>>>>>>>>>>>>");
      })
    }
    else{
    let _this = this;
    this.prefData=[this.indoors,this.outdoors,this.citylife,this.surburbanlife,
      this.rural,this.warm,this.cold,this.introvert,
    this.extrovert,this.clean]

    this.favdata = [this.music,this.food,this.book,this.pets,this.tvShows,this.season]

    this.otherData = [this.other]
      
    let interestData = {
      mainCategory:this.maincategories,
      subCategory:this.subcategories,
      type:this.type,
      hobby:this.description,
      interest:this.otherData,
      personType:this.prefData,
      favourite:this.favdata,
      userId:this.userId
    }
    let logLoader = _this.ep.showLoader("Updating interests...",true);
    console.log("interest data ----------------------------<>>>>>>>>>>>>>>>>>>");
    console.log(interestData);
    this.loginRegProvider.usersInterest(interestData).then(function(success:any){
      console.log("interest success data--------------->>>>>>>>>");
      console.log(success);
      _this.valofinterest = 'true';
      localStorage.setItem('interestKey',_this.valofinterest);
      console.log(_this.valofinterest);
      _this.ep.hideLoader(logLoader);
      _this.ep.showAlert("Data Saved","successfully");
      _this.navCtrl.setRoot('ConnectionPage');

    },function(err){
      _this.ep.hideLoader(logLoader);
      console.log("err-------------------------------------------" + err);
      alert("Please Provide All Details");
    })
  }
}

}

