import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';

/**
 * Generated class for the ShowinterestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showinterest',
  templateUrl: 'showinterest.html',
})
export class ShowinterestPage {
  public userId:any;
  public indata:any=[];
  public typOfpersons:any=[];
  public other:any;

  //person type variables.....
  public ty1:any;
  public ty2:any;
  public ty3:any;
  public ty4:any;
  public ty5:any;
  public ty6:any;
  public ty7:any;
  public ty8:any;
  public ty9:any;
  public ty10:any;
  public ty11:any;
  public ty12:any;
  public ty13:any;
  public ty14:any;
  public ty15:any;
  public ty16:any;


//favourite type of variables'...
public fv1:any;
public fv2:any;
public fv3:any;
public fv4:any;
public fv5:any;
public fv6:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loginRegProvider:LoginRegProvider) {
  }

  ionViewDidLoad() {
    this.userId = localStorage.getItem('userId');
    console.log('ionViewDidLoad ShowinterestPage');
  }
  
  ionViewDidEnter(){
    if(this.userId){
      this.getInterests();
    }
  }

  getInterests(){

    let _this = this;
    this.loginRegProvider.getusersInteresr(this.userId).then(function(success:any){
      console.log("interests---------------------->>>>>>>>>>>>>");
      console.log(success);
      _this.indata = success.data.interestDetails;
      console.log( _this.indata.interest['0']);
      _this.other = _this.indata.interest['0'];

      _this.ty1 = _this.indata.personType['0'];
      _this.ty2 = _this.indata.personType['1'];
      _this.ty3 = _this.indata.personType['2'];
      _this.ty4 = _this.indata.personType['3'];
      _this.ty5 = _this.indata.personType['4'];
      _this.ty6 = _this.indata.personType['5'];
      _this.ty7 = _this.indata.personType['6'];
      _this.ty8 = _this.indata.personType['7'];
      _this.ty9 = _this.indata.personType['8'];
      _this.ty10 = _this.indata.personType['9'];
      _this.ty11 = _this.indata.personType['10'];
      _this.ty12 = _this.indata.personType['11'];
      _this.ty13 = _this.indata.personType['12'];
      _this.ty14 = _this.indata.personType['13'];
      _this.ty15 = _this.indata.personType['14'];
      _this.ty16 = _this.indata.personType['15'];      
      
      

      _this.fv1 = _this.indata.favourite['0'];
      _this.fv2 = _this.indata.favourite['1'];
      _this.fv3 = _this.indata.favourite['2'];
      _this.fv4 = _this.indata.favourite['3'];
      _this.fv5 = _this.indata.favourite['4'];
      _this.fv6 = _this.indata.favourite['5'];
      // _this.typOfpersons= _this.indata.personType;      
      console.log(_this.ty1);
    },function(err){
      console.log("err-------------------" + err);
    })
  }

  moveToAddinterest(){
    this.navCtrl.push('MyinterestPage');
  }

}
