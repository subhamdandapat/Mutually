import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import{HttpClientModule} from '@angular/common/http';
// import { HttpClient } from '@angular/common/http/src/client';

/*
  Generated class for the LoginRegProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginRegProvider {

  public apiUrl:string="https://iontest.herokuapp.com/api";

  constructor(public http: HttpProvider,public httpOne:HttpClient) {
    console.log('Hello LoginRegProvider Provider');
  }




  //API call for creating
  register(data) {
   
    let _base = this;
    return new Promise(function (resolve, reject) {
      // console.log("url==============>>>>>>>>>>"+ _base.apiUrl + '/register?'+'username='+userName+'&email='+email+'&phone='+phoneNumber+'&password='+password);
      _base.http.post(_base.apiUrl + '/customerSignup',data)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

  userLogin(logindata:any) {
    let _base = this;   // instance of this class
    return new Promise(function (resolve, reject) {
      // console.log(_base.apiUrl + '/user_authenticate?'+'email='+email+'&password='+password);
      _base.http.post(_base.apiUrl + '/customerLogin',logindata)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

//get user details...
  getUserDetails(userId:any) {
    let _base = this;   // instance of this class
    return new Promise(function (resolve, reject) {
      // console.log(_base.apiUrl + '/getCustomerById?id='+ userId);
      _base.http.get(_base.apiUrl + '/getCustomerById/'+userId)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

  //update user details...
  updateUserDetails(data:any) {
    let _base = this;   // instance of this class
    return new Promise(function (resolve, reject) {
      _base.http.post(_base.apiUrl+'/updateCustomer',data)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

  //get Alluser details...
  getAllUser(data) {
    let _base = this;   // instance of this class
    return new Promise(function (resolve, reject) {
      console.log(_base.apiUrl + '/getAllCustomers',data);
      _base.http.post(_base.apiUrl + '/getAllCustomers',data)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

  //Users Interest....
  usersInterest(interestdata:any) {
    let _base = this;   // instance of this class
    return new Promise(function (resolve, reject) {
      // console.log(_base.apiUrl + '/user_authenticate?'+'email='+email+'&password='+password);
      _base.http.post(_base.apiUrl + '/createInterest',interestdata)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

   //get interest details...
   getusersInteresr(userId) {
    let _base = this;   // instance of this class
    return new Promise(function (resolve, reject) {
      console.log(_base.apiUrl + '/getInterest');
      _base.http.get(_base.apiUrl + '/getInterest/'+userId)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

  //Post Event....
  // userAddEvent(eventData:any) {
  //   let _base = this;   // instance of this class
  //   let headers = new Headers();
  //   headers.append('content-type','multipart/form-data');
  //   return new Promise(function (resolve, reject) {
  //     _base.httpOne.post(_base.apiUrl + '/createEvent',eventData)
  //       .subscribe(function (success) {
  //         resolve(success);
  //       }, function (error) {
  //         reject(error);
  //       });
  //   });
  // }

  userAddEvent(eventData:any) {
    let _base = this;   // instance of this class
    return new Promise(function (resolve, reject) {
      // console.log(_base.apiUrl + '/user_authenticate?'+'email='+email+'&password='+password);
      _base.http.post(_base.apiUrl + '/createEvent',eventData)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

   //get events...
   getevents() {
    let _base = this;   // instance of this class
    return new Promise(function (resolve, reject) {
      console.log(_base.apiUrl + '/getAllEvents');
      _base.http.get(_base.apiUrl + '/getAllEvents')
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

  //Update user interest
  updateInterest(interestdata:any) {
    let _base = this;   // instance of this class
    return new Promise(function (resolve, reject) {
      // console.log(_base.apiUrl + '/user_authenticate?'+'email='+email+'&password='+password);
      _base.http.post(_base.apiUrl + '/updateInterest',interestdata)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

  userAddSkill(skillData:any) {
    let _base = this;   // instance of this class
    return new Promise(function (resolve, reject) {
      // console.log(_base.apiUrl + '/user_authenticate?'+'email='+email+'&password='+password);
      _base.http.post(_base.apiUrl + '/createSkillShare',skillData)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

   //get events...
   getSkill() {
    let _base = this;   // instance of this class
    return new Promise(function (resolve, reject) {
      console.log(_base.apiUrl + '/getAllSkillShare');
      _base.http.get(_base.apiUrl + '/getAllSkillShare')
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }
}
//semicolonites.website/mutually/api/user_authenticate?email=dgpdebayan@gmail.com&password=123
