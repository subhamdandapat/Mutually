import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConnectionsProvider } from '../../providers/connections/connections';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';

/**
 * Generated class for the FriendlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friendlist',
  templateUrl: 'friendlist.html',
})
export class FriendlistPage {
  public userId:any;
  public friendRequestsFromUser:any = [];
  public friendRequestsToUser:any = [];
  arraydataFrnd:any;
  userData:any;
  frienddetails:any=[];
  public friendlistar:Array<any> = new Array();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public conProvider:ConnectionsProvider,
    public loginRegProvider:LoginRegProvider,) 
  {
    this.userId = localStorage.getItem("userId");
    if(this.userId){
      // this.showFriendList();
      // this.showFriendL();
      this.getallreq();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendlistPage');
  }
  showFriendList(){
    let _base  = this;
    let data = {
      fromUser:this.userId
    }
    this.conProvider.reqStatFromUser(data).then(function(success:any){
      console.log(success);
      _base.friendRequestsFromUser = success.data.details;
      console.log(_base.friendRequestsFromUser);
    },function(err){
      console.log(err);
    })
  }

  showFriendL(){
    let _base  = this;
    let data = {
      toUser:this.userId
    }
    this.conProvider.reqStatToUser(data).then(function(success:any){
      console.log(success);
      _base.friendRequestsToUser = success.data.details;
      console.log(_base.friendRequestsToUser);
    },function(err){
      console.log(err);
    })
  }

  goChat1(touserid){
    console.log("1", touserid);
    this.navCtrl.push('ChatPage',{touserId:touserid});
  }
  goChat(touserid){
    console.log("2", touserid);
    this.navCtrl.push('ChatPage',{touserId:touserid});
  }




  getallreq(){
    let _base = this;
     this.conProvider.getallR(this.userId).then(function(success:any){
       console.log("alll request------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
       console.log(success);
 
       let i = 0;
       let j =0;
       let k=0;
      
         if(success.data.details[0]){
           _base.arraydataFrnd = success.data.details[0].friend;
           for(j = 0;j< _base.arraydataFrnd.length;j++){

            _base.loginRegProvider.getUserDetails(_base.arraydataFrnd[j]).then(function(success:any){
              console.log("get user details in dashboard==========>>>>>>>>>");
              console.log(success);
              _base.userData = success.data.userDetails;
              let userIDe = success.data.userDetails._id; 
              _base.friendlistar.push(_base.userData);
                var check = _base.friendlistar.findIndex(element=>element._id = userIDe);
                console.log(check);
                if(check == -1){
                  _base.friendlistar.push(_base.userData);
                }
              
                // _base.friendlistar.push(_base.userData);
                      
              console.log(_base.friendlistar);
              
            },function(err){
              console.log("error in dashboard===========>>>>>");
              console.log(err);
            })

           }
         }
         else if (success.data.details.friend){
           _base.arraydataFrnd = success.data.details.friend;
           for(j = 0;j< _base.arraydataFrnd.length;j++){

            _base.loginRegProvider.getUserDetails(_base.arraydataFrnd[j]).then(function(success:any){
              console.log("get user details in dashboard==========>>>>>>>>>");
              // console.log(success);
              _base.userData = success.data.userDetails;
              let userIDe = success.data.userDetails._id;
              _base.friendlistar.push(_base.userData);
              var check = _base.friendlistar.findIndex(element=>element._id = userIDe);
              console.log(check);
              if(check == -1){
                _base.friendlistar.push(_base.userData);
              }
              console.log(_base.friendlistar);
            },function(err){
              console.log("error in dashboard===========>>>>>");
              console.log(err);
            })

           }
         }
        
       // }
 
     
     },function(err){
       console.log(err);
     })
   }
}
