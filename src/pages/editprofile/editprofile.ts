import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';
import { ElementsProvider } from '../../providers/elements/elements';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
declare var cordova: any;

/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  data: any=[];
  lastImage: any;
  public userId:any;
  public userData:any=[];
  profileImage:any;
  public imageId='https://via.placeholder.com/350x150';
  public preimageid="https://iontest.herokuapp.com/image/";
  public interestKey:any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loginRegProvider:LoginRegProvider,
    public ep:ElementsProvider,
    private camera: Camera, 
    private transfer: FileTransfer, 
    private file: File, 
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    private crop:Crop,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
      this.interestKey = localStorage.getItem('interestKey');
      console.log("interest key---------------->>>>>>>>>"+ this.interestKey);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');

    this.userId = localStorage.getItem('userId');
    if(this.userId){
      this.getInfo();
    }
  }

  //get user details using id....
  getInfo(){
    let _this = this;
    this.loginRegProvider.getUserDetails(this.userId).then(function(success:any){
      console.log("get user details in dashboard==========>>>>>>>>>");
      console.log(success);
      _this.userData = success.data.userDetails;
      _this.imageId = _this.userData.filename;
      _this.imageId=_this.preimageid+_this.userData.filename;
    },function(err){
      console.log("error in dashboard===========>>>>>");
      console.log(err);
    })
  }

  //Update user details...
  updateUser(){
    let data = {
      username:this.userData.username,
      email:this.userData.email,
      phone:this.userData.phone,
      city:this.userData.city,
      about:this.userData.about,
      work:this.userData.work,
      education:this.userData.education,
      kids:this.userData.kids,
      status:this.userData.status,
      gender:this.userData.gender,
      filename:this.data.profileImage,
      _id:this.userId,
    }
    console.log("gender-========================>>>>>>>>>>>" + this.userData.gender);
    let _this = this;
    let logLoader = this.ep.showLoader("updating...",true);
    this.loginRegProvider.updateUserDetails(data).then(function(success){
      console.log("updated successfullyy============>>>>>>>>");
      console.log(success);
      if(_this.interestKey == "true"){
        _this.navCtrl.setRoot('ShowinterestPage');
      }else{
        _this.navCtrl.setRoot('MyinterestPage');
      }
      _this.ep.hideLoader(logLoader);
      // _this.navCtrl.setRoot('DashboardPage');
      // _this.navCtrl.setRoot('ConnectionPage');
    },function(err){
      console.log("error in update -==============>>>>>>>");
      _this.ep.hideLoader(logLoader);
      _this.ep.showAlert("Opps..","somthing went wrong");
      console.log(err);
    })
  }

  /**
   * @desc Action sheet to select camera/gallery option to choose profile pic
   *
   */
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
            console.log("open camera:")
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

   /**
   * @desc capture data from device and set filepath
   * @param sourceType
   * @returns @string filepath in device
   */
  public takePicture(sourceType)
  {
    let _base = this;

    // Create options for the Camera Dialog
    var options =
      {
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };



    // Get the data of an image...
    this.camera.getPicture(options).then((imagePath) => {
      console.log("imagePath trace.........." + imagePath);

      //Crop function to crop the image...
      this.crop.crop(imagePath,{
        quality: 100,
        targetWidth:160,
        targetHeight:160,
        }).then(function(success:any){
          console.log("here is the success image ..."+success);
          imagePath=success;
          console.log("check image path......"+imagePath);
          _base.imageId = imagePath;
          console.log("check image source type............");
          console.log(sourceType);

      // Speacial handleing for Android platform...
      if (_base.platform.is('android') || sourceType == options.sourceType.PHOTOLIBRARY)
      {
        console.log("selected from library.......");

        _base.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            _base.copyFileToLocalDir(correctPath, currentName, _base.createFileName());
          });
      }
      else {
        var currentName =imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        _base.copyFileToLocalDir(correctPath, currentName, _base.createFileName());
      }

    },
      (err) => {
        this.presentToast('Error while selecting image.');
      });

    },function(error){
      return error;
    })
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 1000,
      position: 'top'
    });

    toast.present();
  }

   // Create a new name for the image
   private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  /**
   * @desc Copy the image to a local folder in case user deletes the image
   */
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      console.log("image file trace ................>>>");
      console.log(this.file);
      console.log(newFileName);
      console.log(cordova.file.dataDirectory);
      console.log(namePath);
      console.log(currentName);
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    }
    else {
      return cordova.file.dataDirectory + img;
    }
  }

  /**
   * @desc If image then upload and update other details
   * otherwise only update
   *
   */
  public uploadImage() {
    
        if (this.lastImage) {
          // Destination URL
          // var url = "https://memeapi.memeinfotech.com/file/fileUpload";
          var url =  "https://iontest.herokuapp.com/api/uploadImage";
    
          // File for Upload
          var targetPath = this.pathForImage(this.lastImage);
    
    
          const fileTransfer: FileTransferObject = this.transfer.create();
          let loader = this.loadingCtrl.create({
            content: "Uploading..."
          });
          loader.present();
    
          var filename = this.lastImage;
    
          var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpeg",
            params: { 'fileName': filename }
          };
          console.log("click in upload image .....");
          fileTransfer.upload(targetPath, url, options).then(data => {
    
            console.log("image upload trace.......");
            console.log(data);
            var temp: any;
            temp = data;
            this.data.profileImage = JSON.parse(temp.response).data.filename;
            console.log(JSON.parse(temp.response).data.filename);
    
            loader.dismiss();
            this.presentToast('Image succesful uploaded.');
            this.updateUser();//update after image uploaded successfully
    
          },
            err => {
              loader.dismiss();
              this.presentToast('Error while uploading file.' + err);
              console.log("Error in image upload function...." + err);
            });
        }
        else {
          this.updateUser();
        }
      }

}
