import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpProvider } from '../providers/http/http';
import { LoginRegProvider } from '../providers/login-reg/login-reg';
import { ElementsProvider } from '../providers/elements/elements';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { ConnectionsProvider } from '../providers/connections/connections';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { HttpClientModule } from '@angular/common/http';
import { SocketProvider } from '../providers/socket/socket';
import { ChatProvider } from '../providers/chat/chat';
import { Device } from '@ionic-native/device/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    LoginRegProvider,
    ElementsProvider,
    ConnectionsProvider,
    File, 
    FileTransfer, 
    FileTransferObject, 
    FilePath,
    Camera,
    Crop,
    SocketProvider,
    ChatProvider,
    Device,
    UniqueDeviceID
  ]
})
export class AppModule {}
