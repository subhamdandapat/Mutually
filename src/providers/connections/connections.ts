import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import{HttpClientModule} from '@angular/common/http';

/*
  Generated class for the ConnectionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectionsProvider {
  public apiUrl:string="https://iontest.herokuapp.com/api";
  

  constructor(public http: HttpProvider,public httpOne:HttpClient) {
    console.log('Hello ConnectionsProvider Provider');
  }

   //Send friend request...

   sendRequest(data) {
     let _base = this;
     return new Promise(function (resolve, reject) {
       _base.http.post(_base.apiUrl + '/sendRequest',data)
         .then(function (success) {
           resolve(success);
         }, function (error) {
           reject(error);
         });
     });
   }

   //Request status check from user...
   reqStatFromUser(data) {
    let _base = this;
    return new Promise(function (resolve, reject) {
      _base.http.post(_base.apiUrl + '/requestStatusOfFromUser',data)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

  
   //Request status check from user...
   reqStatToUser(data) {
    let _base = this;
    return new Promise(function (resolve, reject) {
      _base.http.post(_base.apiUrl + '/requestStatusOfToUser',data)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

   //Accept Request status check from user...
   reqAccept(data) {
    let _base = this;
    return new Promise(function (resolve, reject) {
      _base.http.post(_base.apiUrl + '/acceptRequest',data)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

  //get all request ......
  getallR(id) {
    let _base = this;
    return new Promise(function (resolve, reject) {
      console.log(_base.apiUrl + '/getRequest/'+ id);
      _base.http.get(_base.apiUrl + '/getRequest/'+ id)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }
}
