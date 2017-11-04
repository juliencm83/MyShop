import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { AjoutavisPage } from '../ajoutavis/ajoutavis';
//import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { LireavisPage } from '../lireavis/lireavis';


declare var google;
/**
 * Generated class for the MesmagasinsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mesmagasins',
  templateUrl: 'mesmagasins.html',
})
export class MesmagasinsPage {

  items = [];

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public navParams: NavParams) {
    this.items = JSON.parse(localStorage.getItem("positions"));
  }


  Ajoutbonplan(place){
  /*this.firebaseAnalytics.logEvent('ClicAjoutAvis', {page: place.name})
  .then((res: any) => console.log(res))
  .catch((error: any) => console.error(error));*/
    this.navCtrl.push(AjoutavisPage, {"place":place});
  }

  Lirebonplan(place){
    /*this.firebaseAnalytics.logEvent('ClicAjoutAvis', {page: place.name})
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));**/
      this.navCtrl.push(LireavisPage, {"place":place});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MesmagasinsPage');
  }

}
