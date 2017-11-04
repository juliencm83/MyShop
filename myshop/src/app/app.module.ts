import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalisationProvider } from '../providers/localisation/localisation';
import { Geolocation } from '@ionic-native/geolocation';
import { MagasinProvider } from '../providers/magasin/magasin';
import { MagasinPage } from '../pages/magasin/magasin';
import { MesmagasinsPage } from '../pages/mesmagasins/mesmagasins';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { AjoutavisPage } from '../pages/ajoutavis/ajoutavis';
//import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import {LireavisPage} from '../pages/lireavis/lireavis'
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MagasinPage,
    MesmagasinsPage,
    AjoutavisPage,
    LireavisPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MagasinPage,
    MesmagasinsPage,
    AjoutavisPage,
    LireavisPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    AndroidPermissions,
    LocalisationProvider,
    Diagnostic,
    MagasinProvider,
    //FirebaseAnalytics
  ]
})
export class AppModule {}
