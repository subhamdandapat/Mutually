import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConnectionsProvider } from '../../providers/connections/connections';
import { ElementsProvider } from '../../providers/elements/elements';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the RequestlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requestlist',
  templateUrl: 'requestlist.html',
})
export class RequestlistPage {
  public userId:any;
  public friendRequests:any;
  arraydataPending:any;
  btnAc:String='Accept';
  btnRe:String='Reject';


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public conProvider:ConnectionsProvider,
    public ep:ElementsProvider) {

      this.userId = localStorage.getItem("userId");
      if(this.userId){
        this.getallreq();
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestlistPage');
  }

  //request list...
  getRequestList(){

    let lding = this.ep.showLoader("Loading....",true);
    let _base  = this;
    let data = {
      toUser:this.userId
    };
    this.conProvider.reqStatToUser(data).then(function(success:any){
      console.log(success);
      _base.friendRequests = success.data.details;
      _base.ep.hideLoader(lding);
      console.log(_base.friendRequests)
    },function(err){
      console.log(err);
      _base.ep.hideLoader(lding);
      // _base.ep.showAlert("somthing went wrong","try again");
    })
  }
  
  acceptReq(req){
    let _base = this;
    let lding = this.ep.showLoader("Loading....",true);
    console.log(req);
    let reqdata = {
      senderId:req,
      receiverId:this.userId
    }
    console.log(reqdata);
    this.conProvider.reqAccept(reqdata).then(function(success:any){
      console.log(success);
      _base.getallreq();
      _base.ep.hideLoader(lding);
    },function(err){
      console.log(err);
      _base.ep.hideLoader(lding);
      // _base.ep.showAlert("somthing went wrong","try again");
      
    })
  }



  getallreq(){
    let _base = this;
     this.conProvider.getallR(this.userId).then(function(success:any){
       console.log("alll request------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
       console.log(success);
       // console.log(success.data.details[0].request_send.length);
       // console.log(success.data.details.friend.length);
       
 
       let i = 0;
       let j =0;
       let k=0;
      
      
 
       //  if(success.data.details.pending_request !=0 || success.data.details.pending_request != null){
         if(success.data.details[0]){
           _base.friendRequests = success.data.details[0].pending_request;
           console.log(success.data.details[0].pending_request);
          //  for(k =0;k<_base.arraydataPending.length;k++){
          //    console.log(_base.arraydataPending[k]._id);
          //    if(_base.arraydataPending[k]._id == _base.userId){
          //    }
          //  }
         }
         else if(success.data.details.pending_request){
           _base.friendRequests = success.data.details.pending_request;
           console.log(success.data.details.pending_request);
          //  for(k =0;k<_base.arraydataPending.length;k++){
          //    console.log(_base.arraydataPending[k]);
          //    if(_base.arraydataPending[k]!=null && _base.arraydataPending[k]._id == _base.userId){
          //    }
          //  }
         }
        
       // }
 
     },function(err){
       console.log(err);
     })
   }
}
