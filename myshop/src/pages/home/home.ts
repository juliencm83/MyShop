import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  places: Array<any>;

  constructor(public navCtrl: NavController, public geolocation: Geolocation,private androidPermissions: AndroidPermissions,
    private diagnostic: Diagnostic ,public http: Http, public storage: Storage,private alertCtrl: AlertController) {

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Localisation',
      subTitle: 'Merci d\'activer la localisation',
      buttons: ['Ok']
    });
    alert.present();
  }

  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: 'Localisation',
      subTitle: 'Merci d\'autoriser la localisation',
      buttons: ['Ok']
    });
    alert.present();
  }

  ionViewDidLoad() {
    this.diagnostic.isLocationEnabled().then((state)=>{
      if (state == false)
        this.presentAlert();
    });
    this.diagnostic.isLocationAuthorized().then((state)=>{
      if (state == false)
      {
        this.presentAlert2();
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION]);
      }
    });
    this.loadMap();
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  getStore(latLng) {
    var service = new google.maps.places.PlacesService(this.map);
    var request = {
      location: latLng,
      radius: '2000',
      keyword: "hypermarché"
    };
    return new Promise((resolve, reject) => {
      service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }
  getSupermarche(latLng) {
    var service = new google.maps.places.PlacesService(this.map);
    var request = {
      location: latLng,
      radius: '2000',
      keyword: "supermarché"
    };
    return new Promise((resolve, reject) => {
      service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }
  getSuperette(latLng) {
    var service = new google.maps.places.PlacesService(this.map);
    var request = {
      location: latLng,
      radius: '2000',
      keyword: "superette"
    };
    return new Promise((resolve, reject) => {
      service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8
      },
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<p>This is your current position !</p>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  AddFavorite(place) {
    console.log("Lolilol");
    //this.addItem(JSON.stringify({ name: place.name, location: place.geometry.location }));

  }

  createMarker(place) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location
    });
    let content = place.name;
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  loadMap() {

    let AllStore: Array<any> = [];
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      this.map = new google.maps.Map(document.getElementById('map'), {
        center: latLng,
        zoom: 15
      });

      //this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.getStore(latLng).then((results: Array<any>) => {
        console.log("Nombre = " + results.length);
        AllStore = results;
        for (let i = 0; i < results.length; i++) {
          this.createMarker(results[i]);
        }
        this.getSupermarche(latLng).then((results: Array<any>) => {
          console.log("Nombre = " + results.length);
          AllStore = AllStore.concat(results);
          for (let i = 0; i < results.length; i++) {
            this.createMarker(results[i]);
          }
          this.getSuperette(latLng).then((results: Array<any>) => {
            console.log("Nombre = " + results.length);
            AllStore = AllStore.concat(results);
            for (let i = 0; i < results.length; i++) {
              this.createMarker(results[i]);
            }

            console.log(AllStore.length);
            localStorage.setItem("positions", JSON.stringify(AllStore));
          }, (status) => console.log(status));
        }, (status) => console.log(status));
      }, (status) => console.log(status));


      this.addMarker();
    }, (err) => {
      console.log(err);
    });
  }
}
