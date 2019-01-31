import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { Observable } from "rxjs/Observable";
import { HttpProvider } from '../http/http';
/*
  Generated class for the SocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocketProvider {
  socket: any;
  

  public BASE_URL:string="https://iontest.herokuapp.com";
  
  constructor(public http: HttpClient,public httpProvider:HttpProvider) {
    console.log('Hello SocketProvider Provider');
    
  }

    /* 
* Method to connect the users to socket
*/
connectSocket(userId:any) {
  console.log("socket || connectSocket trace id:-" + userId);
  this.socket = io(this.BASE_URL, { query: `userId=${userId}` });
  // this.socket = io(this.BASE_URL);
  
}


/* 
* Method to emit the add-messages event.
*/
sendMessage(message: any): void {
  console.log("socket || sendMessage trace id:-" + message);
  this.socket.emit('add-message', message);
}


// socketEvents()
// {
//     this.io.on('connection',(socket) => {
//         socket.on('send message',function(data)
//         {
//             this.io.emit('new message',data);//here the error lies.
//         }bind(this));
//     }); 
// }

receiveMessages(): any {
  console.log("socket || receiveMessages trace id:-");

  let observable = new Observable(observer => {
    this.socket.on('add-message-response', (data) => {
      console.log(data);
      observer.next(data);
    });

    return () => {
      this.socket.disconnect();
    };
  });
  return observable;
}

/* 
* Method to send typing status.
*/
sendTypingStatus(value) {
  console.log(value.typing_status);
  this.socket.emit('type-status', value);
  console.log("passing");
}

/* 
* Method to receive typing status from user.
*/

receiveTypingStatus() {
  let observable = new Observable(observer => {
    // console.log('typing statusreceived');
    this.socket.on('type-status-response', (data) => {
      observer.next(data);
    });
    return () => {
      this.socket.disconnect();
    }
  })
  return observable;
}

/* 
* Method to emit the logout event.
*/
logout(userId):any{

  this.socket.emit('logout', userId);

  let observable = new Observable(observer => {
  
    this.socket.on('logout-response', (data) => {
      observer.next(data); 
    });

    return () => {
      
      this.socket.disconnect();
    }; 
  }) 
  
  return observable;
}

/* 
* Method to receive chat-list-response event.
*/
getChatList(userId: string): any {
  console.log("socket || getChatList trace id:-" + userId);
  this.socket.emit('chat-list', { userId: userId });

  let observable = new Observable(observer => {
    this.socket.on('chat-list-response', (data) =>
     {
      observer.next(data);
    });

    return () => {
      this.socket.disconnect();
    };
  })
  return observable;
}

// receiveChatList() {
//   let observable = new Observable(observer => {
//     this.socket.on('chat-list-response', (data) => {
//       observer.next(data);
//     });

//     return () => {
//       this.socket.disconnect();
//     };
//   })
//   return observable;
// }


// public chatHistory(params, callback): any {
//   this.httpProvider.chatHistory(params).subscribe(
//       data => {
//           callback(false, data);
//       },
//       error => {
//           callback(true, 'HTTP fail.');
//       }
//   );
// }
}
