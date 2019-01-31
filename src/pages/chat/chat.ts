import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';
import { SocketProvider } from '../../providers/socket/socket';
import { Content } from 'ionic-angular/navigation/nav-interfaces';
import { ChatProvider } from '../../providers/chat/chat';
import * as moment from 'moment';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  queries: {
		content: new ViewChild('content')
	}
})
export class ChatPage {
  userinfo: any;
 
  // @ViewChild("ChatScroll") content: Content;
  content: any;
  toUserId: any;
  public userId:any;
  userData:any=[];
  touserData:any=[];
  private message = '';
	private messages = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loginRegProvider:LoginRegProvider,
    public socketProvider:SocketProvider,
  public chatPro:ChatProvider) {

    this.userId = localStorage.getItem("userId");
    console.log(this.userId);
    if(this.userId){
      this.socketProvider.connectSocket(this.userId);
      this.getInfo();
    }
    this.toUserId = this.navParams.get('touserId');
    console.log(this.toUserId);
    if(this.toUserId){
      this.gettouserinfo();
    }

    if (this.userId && this.toUserId){
      console.log("get messagesssssssss------------------------");
      // this.getMessages();
      this.getPromiseMessages();
      // this.getPromiseMessagesFrom();
      
      // this.getMessagesother();
    }



    this.socketProvider.receiveMessages().subscribe(response => {
      console.log(response);
			// if (this.selectedUserId && this.selectedUserId == response.fromUserId) {
				this.messages.push(response);
				this.userinfo = response;
				this.userinfo.timestamp = moment.unix(this.userinfo.timestamp).format('LT');
				setTimeout(() => {
					document.querySelector(`.col-width`).scrollTop = document.querySelector(`.col-width`).scrollHeight;
				}, 100);
				setTimeout(() => {
					this.content.scrollToBottom(300);//300ms animation speed
				});
			// }

		});;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    // this.toUserId = this.navParams.get('touserId');
    // console.log(this.toUserId);
    // if(this.toUserId){
    //   this.gettouserinfo();
    // }
    // if (this.userId && this.toUserId){
    //   console.log("get messagesssssssss------------------------");
    //   this.getMessages();
    // }
  }
//scrolls to bottom whenever the page has loaded
ionViewDidEnter() {
  // this.ScrollToBottom();//300ms animation speed
}
ScrollToBottom(){
  var element = document.getElementById("myLabel");
  // I can't remember why I added a short timeout, 
  // but you might be able to use ngzone instead.
  // the below works great though. 
  setTimeout(()=>{element.scrollIntoView(true)},200); 
}

  getInfo(){
    let _base = this;
    this.loginRegProvider.getUserDetails(this.userId).then(function(success:any){
      console.log("get user details in dashboard==========>>>>>>>>>");
      console.log(success);
      _base.userData = success.data.userDetails;
      localStorage.setItem("userName",_base.userData.username);
      // _this.trueimage=_this.preimageid+_this.userData.filename;
    },function(err){
      console.log("error in dashboard===========>>>>>");
      console.log(err);
    })
  }

  gettouserinfo(){
    let _base = this;
    this.loginRegProvider.getUserDetails(this.toUserId).then(function(success:any){
      console.log("get user details in dashboard==========>>>>>>>>>");
      console.log(success);
      _base.touserData = success.data.userDetails;
      localStorage.setItem("userName",_base.touserData.username);
      // _this.trueimage=_this.preimageid+_this.userData.filename;
    },function(err){
      console.log("error in dashboard===========>>>>>");
      console.log(err);
    })
  }


  alignMessage(id) {
    // console.log("align..,.,.,.,.,.,.,..........");
		return this.userId === id ? false : true;

	}


  sendMessage() {

		if (this.message === '' || this.message === null) {
			alert(`Message can't be empty.`);
		} else {

			if (this.message === '') {
				alert(`Message can't be empty.`);
			// } else if (this.id === '') {
			// 	this.navCtrl.push('/');
			// } else if (this.selectedUserId === '') {
			// 	alert(`Select a user to chat.`);
			} else {

				const data = {
					fromUserId: this.userId,
					message: (this.message).trim(),
					toUserId: this.toUserId,
					timestamp:''


					// toSocketId : this.selectedSocketId,
					// fromSocketId : this.socketId
        }
        console.log(data);
				this.messages.push(data);
				setTimeout(() => {
					this.content.scrollToBottom();//300ms animation speed
				});

				// setTimeout(() => {
				// 	document.querySelector(`.col-width`).scrollTop = document.querySelector(`.col-width`).scrollHeight;
				// }, 100);

				/* 
				* calling method to send the messages
				*/
				this.message = null;
				this.socketProvider.sendMessage(data);
			}
    }
  }
    

    // getMessages() {
    //   var data = {
    //     fromUserId: this.userId,
    //     toUserId: this.toUserId
    //   }
    //   console.log("get message method------>>>>>"+ data);
    //   console.log(data);
    //   this.socketProvider.chatHistory(data, (error, data) => {
    //     if (error) {
    //       throw error;
    //     }
    //     else {
    //       console.log(data.data.chat_messages);
    //       this.messages = data.data.chat_messages;
    //       this.messages.forEach(element => {
    //         // element.timestamp = moment.unix(element.timestamp).format('LT');
    //         this.messages.push(element);
    //         setTimeout(() => {
    //           this.content.scrollToBottom(10);//300ms animation speed
    //         });
    //       });
    //     }
    //   });
    // }


    // getMessagesother() {
    //   var data = {
    //     fromUserId: this.toUserId,
    //     toUserId: this.userId
    //   }
    //   console.log("get message method------>>>>>"+ data);
    //   console.log(data);
    //   this.socketProvider.chatHistory(data, (error, data) => {
    //     if (error) {
    //       throw error;
    //     }
    //     else {
    //       console.log("other end")
    //       console.log(data.data.chat_messages);
    //       this.messages = data.data.chat_messages;
    //       this.messages.forEach(element => {
    //         // element.timestamp = moment.unix(element.timestamp).format('LT');
    //         this.messages.push(element);
    //         setTimeout(() => {
    //           this.content.scrollToBottom(10);//300ms animation speed
    //         });
    //       });
    //     }
    //   });
    // }

    getPromiseMessages(){
      let _base  = this;
      let data = {
        fromUserId: this.userId,
        toUserId: this.toUserId
      }
      this.chatPro.chatHistoryTo(data).then(function(success:any){
        console.log(success);
        _base.messages = success.data.chat_messages;
        _base.messages.forEach(element => {
          element.timestamp = moment.unix(element.timestamp).format('LT');
          _base.messages.push(element);
          setTimeout(() => {
            _base.content.scrollToBottom(10);//300ms animation speed
          });
        });
      },function(err){
        console.log(err);
      })
    }

    // getPromiseMessagesFrom(){
    //   let _base = this;
    //   let data = {
    //     fromUserId: this.toUserId,
    //     toUserId: this.userId
    //   }
    //   this.chatPro.chatHistoryFrom(data).then(function(success:any){
    //     console.log("from data --------");
    //     console.log(success);
    //     _base.messages = success.data.chat_messages;
    //     _base.messages.forEach(element => {
    //       element.timestamp = moment.unix(element.timestamp).format('LT');
    //       _base.messages.push(element);
    //       setTimeout(() => {
    //         _base.content.scrollToBottom(10);//300ms animation speed
    //       });
    //     });
    //   },function(err){
    //     console.log(err);
    //   })
    // }
	}

