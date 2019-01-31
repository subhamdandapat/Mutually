import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * @desc this page contains services for showing alerts and loaders to user
 */
@Injectable()
export class ElementsProvider {

  constructor(public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    console.log('Hello ElementsProvider Provider');
  }

  showLoader(content: string, hide: boolean) {
    let _base = this;
    let loading: any;
    if (hide == true) {
      loading = _base.loadingCtrl.create({
        content: content
      });
    } else {
      loading = _base.loadingCtrl.create({
        spinner: 'hide',
        content: content
      });
    }

    loading.present();
    return loading;
  }

  hideLoader(loader: any) {
    loader.dismiss();
  }

  showAlert(title: string, content: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons: ['OK']
    });
    alert.present();
  }


}
