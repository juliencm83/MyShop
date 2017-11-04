import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the LireavisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lireavis',
  templateUrl: 'lireavis.html',
})
export class LireavisPage {
  item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.item = navParams.get('place');
    this.getItems();
  }

  url = 'https://myshop-dab47.firebaseio.com/items.json';
allshop:Array<any> = [];
items:Array<any> = [];
  getItems() {
    this.http.get(this.url).subscribe(data => {
      var tmp = data.json();
      for (var key in tmp) {
        this.allshop.push(tmp[key]);
      }
      for (var i in this.allshop)
      {
        if ((this.allshop[i]["location"]["lat"] == this.item.geometry.location.lat) &&
        (this.allshop[i]["location"]["lng"] == this.item.geometry.location.lng)){
          this.items.push(this.allshop[i]["avis"]);
        }
      }

      console.log(this.items);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LireavisPage');
  }

}
