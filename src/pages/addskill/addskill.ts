import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { ElementsProvider } from '../../providers/elements/elements';
import { Camera } from '@ionic-native/camera';
import { FileTransfer,FileTransferObject} from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Crop } from '@ionic-native/crop';
import { LoginRegProvider } from '../../providers/login-reg/login-reg';
declare var cordova: any;

/**
 * Generated class for the AddskillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addskill',
  templateUrl: 'addskill.html',
})
export class AddskillPage {
  userId: string;


  profileImage: any;
  public uploadP = 'Upload Photo/Videos';
    // lastImage ="https://pbs.twimg.com/media/BuL42fDCEAAHqZ5.jpg";
    lastImage:any;
    public imageId:any;

    username:any;
    description:any;

    public title:any;
    public category:any;
    imgvalue:any;
    public type:any;
    a:any;
    b:any;
    c:any;


  constructor(public navCtrl: NavController,
    public logReg:LoginRegProvider, 
    public navParams: NavParams,
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
      this.userId = localStorage.getItem('userId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddskillPage');
  }


  uploadImagee(){
    console.log("aaaaaaaaaa--------->>>>>"+this.a);
    
  }
  addEvent(){
    if(this.a == true){
      this.type = "Beginner";
    }
    else if(this.b == true){
      this.type = "Intermidiate"
    }
    else if(this.c == true){
      this.type = "Advance"
    }
    let formData={
     userId:this.userId,
     type:this.type,
     title:this.title,
     category:this.category,
     image:this.profileImage
    }
    let _this = this;
    console.log("debugger :",formData);

    let logLoader = _this.ep.showLoader("Updating Skill...",true);
    this.logReg.userAddSkill(formData).then(function(success:any){
      _this.ep.hideLoader(logLoader);
      _this.navCtrl.push('ShowSkillPage');
      console.log("post success event=================>>>>>>>>>>>>");
      console.log(success);
    },function(err){
      _this.ep.hideLoader(logLoader);
      console.log("err in event post------------------>>>>>>>>"+ err);
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
          _base.uploadP ="selected";
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
          var url =  "https://iontest.herokuapp.com/api/skillShareImageSaved";
    
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
            // this.profileImage = temp.response.image[0].image;
            console.log(temp.response.image);
            this.profileImage = JSON.parse(temp.response).image;
            console.log(JSON.parse(temp.response).image);
    
            loader.dismiss();
            this.presentToast('Image succesful uploaded.');
            this.addEvent();//update after image uploaded successfully
    
          },
            err => {
              loader.dismiss();
              this.presentToast('Error while uploading file.' + err);
              console.log("Error in image upload function...." + err);
            });
        }
        else {
          alert("please select an image and try again");
          // this.addEvent();
        }
      }


}
