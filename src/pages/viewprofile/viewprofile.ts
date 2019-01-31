import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';
import { ConnectionsProvider } from '../../providers/connections/connections';
import { ElementsProvider } from '../../providers/elements/elements';

/**
 * Generated class for the ViewprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewprofile',
  templateUrl: 'viewprofile.html',
})
export class ViewprofilePage {
  addfrnd:any;
  realbuttonobj={};
  public userId:any;
  userData:any=[];
  ownId:any;
  public buttonAdd:any=[];
  userName:any;
  arraydata:any;
  arraydataFrnd:any
  arraydataPending:any;
  buttnname:String;
  // profileImage = "https://via.placeholder.com/350x150";
  public  imageUrl = "https://iontest.herokuapp.com/image/";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ep:ElementsProvider,
    public loginRegProvider:LoginRegProvider,
    public conProvider:ConnectionsProvider) {
      
      this.ownId = localStorage.getItem("userId");
      if(this.ownId){
        this.getallreq();
      }
     this.userName = localStorage.getItem("userName");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewprofilePage');
    this.userId = this.navParams.get('userId');
    console.log(this.userId);
    if(this.userId){
      this.getInfo();
    }
    if(this.ownId){
    // this.checkStatus();
    }
  }

   //get user details using id....
   getInfo(){
     let ld = this.ep.showLoader("Loading data...",true);
    let _this = this;
    this.loginRegProvider.getUserDetails(this.userId).then(function(success:any){
      console.log("get user details in dashboard==========>>>>>>>>>");
      console.log(success);
      _this.userData = success.data.userDetails;
      _this.ep.hideLoader(ld);
      // _this.imageUrl =_this.imageUrl+_this.userData.filename;
      
    },function(err){
      _this.ep.hideLoader(ld);
      _this.ep.showAlert("something went wrong","please try again");      
      console.log("error in dashboard===========>>>>>");
      console.log(err);
    })
  }

  addFriend(){
    let _base = this;
    if(this.buttnname == 'Request Send Already'){
      alert('You have already send Request to that User');
    }
    else if(this.buttnname =='Accept'){
      let accdata = {
        senderId:this.userId,
        receiverId:this.ownId
      }
      this.conProvider.reqAccept(accdata).then(function(success:any){
        console.log(success);
        console.log("accepted------------------------------>>>>>>>>>>>>");
        _base.buttnname =='Friends'

      },function(err){
        console.log(err);
      })
    }
    else{

      let ld = this.ep.showLoader("Sending Request...",true);
      
      let _base = this;
      let reqData = {
        senderId:this.ownId,
        receiverId:this.userId,
        // receiverName:this.userData.username,
        // senderName:this.userName
      }
      console.log(reqData);
      this.conProvider.sendRequest(reqData).then(function(success:any){
        console.log("request send---------------");
        this.buttnname ='Request Send';
        _base.ep.hideLoader(ld);
        // _base.checkStatus();
        console.log(success);
      },function(err){
        _base.ep.hideLoader(ld);
        console.log("err=----------------"+ err);
      })
    }
    
  }

  //Request Status check...
  checkStatus(){

    let _base=this;
    let data = {
      fromUser:this.ownId
    }
    this.conProvider.reqStatFromUser(data).then(function(success:any){
      console.log(success);
      _base.buttonAdd = success.data.details;
      console.log(_base.buttonAdd);
      _base.vvv();
    },function(err){
      _base.addfrnd=-1;
      // _base.vvv();
      console.log(err);

    })
  }
  
  vvv(){
    let xx=0;
    let _base=this;
    console.log(_base.buttonAdd.length);
    for (xx = 0; xx < _base.buttonAdd.length; xx++) {
      console.log(xx)
      if (_base.buttonAdd[xx].toUser === _base.userId) {
        _base.addfrnd=xx;
        _base.realbuttonobj=_base.buttonAdd[xx];
        console.log(_base.realbuttonobj)
          return ;
      }
      else{
        _base.addfrnd=-1;
      }
    }
  }

  getallreq(){
   let _base = this;
   _base.buttnname='Add Friend';
    this.conProvider.getallR(this.ownId).then(function(success:any){
      console.log("alll request------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(success);
      // console.log(success.data.details[0].request_send.length);
      // console.log(success.data.details.friend.length);
      

      let i = 0;
      let j =0;
      let k=0;
      // if(success.data.details['request_send'] != [] || success.data.details['request_send'] != null){
        if(success.data.details.request_send){
          _base.arraydata = success.data.details.request_send;
          for(i = 0 ;i < _base.arraydata.length;i++)
          {
            console.log(_base.arraydata[i]);
            if(_base.arraydata[i] == _base.userId){
              _base.buttnname='Request Send Already';
              console.log("matched--------------------------->>>>>>>>>>>>>");
            }
          }
        }
        else if(success.data.details[0]){
          _base.arraydata = success.data.details[0].request_send;
          for(i = 0 ;i < _base.arraydata.length;i++)
          {
            console.log(_base.arraydata[i]);
            if(_base.arraydata[i] == _base.userId){
              _base.buttnname='Request Send Already';
              console.log("matched--------------------------->>>>>>>>>>>>>");
            }
          }
        }
       
      // }
      //  if( success.data.details.friend != 0 ||  success.data.details.friend != null){
        if(success.data.details[0]){
          _base.arraydataFrnd = success.data.details[0].friend;
          for(j = 0;j< _base.arraydataFrnd.length;j++){
            if(_base.arraydataFrnd[j]== _base.userId){
              _base.buttnname='Friends';
            }
          }
        }
        else if (success.data.details.friend){
          _base.arraydataFrnd = success.data.details.friend;
          for(j = 0;j< _base.arraydataFrnd.length;j++){
            if(_base.arraydataFrnd[j]== _base.userId){
              _base.buttnname='Friends';
            }
          }
        }
       
      // }

      //  if(success.data.details.pending_request !=0 || success.data.details.pending_request != null){
        if(success.data.details[0]){
          _base.arraydataPending = success.data.details[0].pending_request;
          for(k =0;k<_base.arraydataPending.length;k++){
            console.log(_base.arraydataPending[k]._id);
            if(_base.arraydataPending[k]._id == _base.userId){
              _base.buttnname='Accept';
            }
          }
        }
        else if(success.data.details.pending_request){
          _base.arraydataPending = success.data.details.pending_request;
          for(k =0;k<_base.arraydataPending.length;k++){
            console.log(_base.arraydataPending[k]);
            if(_base.arraydataPending[k]!=null && _base.arraydataPending[k]._id == _base.userId){
              _base.buttnname='Accept';
            }
          }
        }
       
      // }

    },function(err){
      console.log(err);
    })
  }
  
}
