import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the AjoutavisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajoutavis',
  templateUrl: 'ajoutavis.html',
})
export class AjoutavisPage {
  item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.item = navParams.get('place');
  }
  Avis: any;

  Add() {
    this.addItem(JSON.stringify({ 'location': this.item.geometry.location, 'avis': this.Avis }));
    this.navCtrl.pop();
  }


  url = 'https://myshop-dab47.firebaseio.com/items.json';

  addItem(postData) {
    this.http.post(this.url, postData).subscribe(function (data) {
      //this.items = getItems();
    });

  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutavisPage');
  }

}
