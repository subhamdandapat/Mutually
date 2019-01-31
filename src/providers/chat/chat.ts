import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  public BASE_URL:string="https://iontest.herokuapp.com/api/";

  constructor(public httpOne: HttpClient,public http: HttpProvider) {
    console.log('Hello ChatProvider Provider');
  }


    //update user details...
    chatHistoryTo(data:any) {
      let _base = this;   // instance of this class
      return new Promise(function (resolve, reject) {
        _base.http.post(_base.BASE_URL+'getMessages',data)
          .then(function (success) {
            resolve(success);
          }, function (error) {
            reject(error);
          });
      });
    }

     //update user details...
     chatHistoryFrom(data:any) {
      let _base = this;   // instance of this class
      return new Promise(function (resolve, reject) {
        _base.http.post(_base.BASE_URL+'getMessages',data)
          .then(function (success) {
            resolve(success);
          }, function (error) {
            reject(error);
          });
      });
    }

}
