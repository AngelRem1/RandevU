import { MarkerSharingService } from './marker-sharing.service';
import { Platform } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  HtmlInfoWindow
} from '@ionic-native/google-maps';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  // instance variables
  map: GoogleMap;
  Arcades: any[] = [
   {
    Name: 'Family Amusement Corporation',
    Address: '876 N Vermont Ave, Los Angeles, CA 90029',
    Hours: '8:30 AM - 1:30 AM'
   },
   {
    Name: 'Jimenez Arcade',
    Address: '2128 7th st, Los Angeles, CA 90057',
    Hours: 'Mon-Thurs: 10:00 AM - 10:30 PM'
   },
  ];
  // constructor
  constructor(private geolocation: Geolocation, private platform: Platform, private iab: InAppBrowser,
              public modalController: ModalController, private markerService: MarkerSharingService) {
  }

  // methods
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-modal-css'
    });

    this.markerService = new MarkerSharingService();
    const arcade = this.Arcades[0];
    this.markerService.setArcadeName(arcade.Name);
    this.markerService.setHours(arcade.Hours);
    this.markerService.getArcadeName(arcade.Name);
    setTimeout(() => {
      modal.present();
    }, 1000);

  }
  async presentModal1() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        Name: 'Family Amusement Corporation',
        Address: '876 N Vermont Ave, Los Angeles, CA 90029',
        Hours: '8:30 AM - 1:30 AM'
      }
    });


    return await modal.present();
  }
  async ngOnInit() {
    await this.platform.ready();
    await this.mapGeolocation();
  }
  mapGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords);
      this.loadMap(resp.coords.latitude, resp.coords.longitude);

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

  loadMap(lat, long) {
    console.log(lat);
    console.log(long);
    Environment.setEnv({
      // This code is necessary for browser
      // tslint:disable-next-line:object-literal-key-quotes
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyC4u5dqJyoNgizRbD-ZaEul0YKOmrVtkBo',
      // tslint:disable-next-line:object-literal-key-quotes
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyC4u5dqJyoNgizRbD-ZaEul0YKOmrVtkBo'
    });

    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat,
          lng: long
        },
        zoom: 12,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
    const mark = {
      url: 'https://i.ibb.co/HxcxjcF/Group.png', // image url
      size: {
        height: 45,
        width: 20
      }
    };
    const you = {
      // tslint:disable-next-line:max-line-length
      url: 'https://i.ibb.co/BVC14Z5/Group-9.png',
      size: {
        height: 45,
        width: 30
      }
    };
    const marker: Marker = this.map.addMarkerSync({
      icon: you,
      animation: 'DROP',
      position: {
        lat,
        lng: long
      }
    });

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      this.presentModal();
    });

    const marker2: Marker = this.map.addMarkerSync({
      icon: mark,
      animation: 'DROP',
      position: {
        lat: 34.087520,
        lng: -118.291480
      }
    });

    const htmlInfoWindow2 = new HtmlInfoWindow();
    const frame2: HTMLElement = document.createElement('div');

    frame2.innerHTML = `
<div class="flip-container" id="flip-container">
  <div class="flipper">
    <div class="front">
    <h3>Family Amusement Corporation</h3>
  </div>
  <div class="back">
    <!-- back content -->
    876 N Vermont Ave, Los Angeles, CA 90029
    <button><a href="maps:?q=34.087520,-118.291480" target="_system">Map</a>Open Maps</button>
    </div>
   <div class=back> hours: 8:30 AM - 1:30 AM</div>
  </div>
</div>`;

    htmlInfoWindow2.setContent(frame2, {
      width: '280px',
      height: '150px'
    });
    marker2.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      // htmlInfoWindow2.open(marker2);
      this.presentModal();
    });
    const marker3: Marker = this.map.addMarkerSync({
      icon: mark,
      animation: 'DROP',
      position: {
        lat: 34.054930,
        lng: -118.273460
      }
    });

    const htmlInfoWindow3 = new HtmlInfoWindow();
    const frame3: HTMLElement = document.createElement('div');

    frame3.innerHTML = `
<div class="flip-container" id="flip-container">
  <div class="flipper">
    <div class="front">
    <h3>Jimenez Arcade</h3>
    <img src="">
  </div>
  <div class="back">
    <!-- back content -->
    2128 7th St, Los Angeles, CA 90057
    <button><a href="maps:?q=34.054930,-118.273460" target="_system">Map</a>Open Maps</button>
    </div>
    <div class=back> hours('Mon-Thurs'): 10:00 AM - 10:30 PM</div>
    <div class=back> hours('Fri-Sun'): 10:00 AM - 11:00 PM</div>
  </div>
</div>`;

    htmlInfoWindow3.setContent(frame3, {
      width: '280px',
      height: '150px'
    });
    marker3.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      htmlInfoWindow3.open(marker3);
      this.presentModal();
    });
    const marker4: Marker = this.map.addMarkerSync({
      icon: mark,
      animation: 'DROP',
      position: {
        lat: 33.980000,
        lng: -118.220000
      }
    });

    const htmlInfoWindow4 = new HtmlInfoWindow();
    const frame4: HTMLElement = document.createElement('div');

    frame4.innerHTML = `
<div class="flip-container" id="flip-container">
  <div class="flipper">
    <div class="front">
    <h3>One More Round Arcade</h3>

  </div>
  <div class="back">
    <!-- back content -->
    6322025047, Huntington Park, CA 90255
    <button><a href="maps:?q=33.980000,-118.220000" target="_system">Map</a>Open Maps</button>
    </div>
    <div class=back> hours ('Mon-Thurs'): 8:30 AM - 1:30 AM</div>
  </div>
</div>`;

    htmlInfoWindow4.setContent(frame4, {
      width: '280px',
      height: '150px'
    });
    marker4.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      htmlInfoWindow4.open(marker4);
    });
    const marker5: Marker = this.map.addMarkerSync({
      icon: mark,
      animation: 'DROP',
      position: {
        lat: 34.041350,
        lng: -118.214075,
      }
    });

    const htmlInfoWindow5 = new HtmlInfoWindow();
    const frame5: HTMLElement = document.createElement('div');

    frame5.innerHTML = `
<div class="flip-container" id="flip-container">
  <div class="flipper">
    <div class="front">
    <h3>Moon Age Reality Arcade</h3>

  </div>
  <div class="back">
    <!-- back content -->
    2208 E 4th St, Los Angeles, CA 90033
    <button><a href="maps:?q=34.041350,-118.213980" target="_system">Map</a>Open Maps</button>
    </div>
  </div>
</div>`;

    htmlInfoWindow5.setContent(frame5, {
      width: '280px',
      height: '150px'
    });
    marker5.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      htmlInfoWindow5.open(marker5);
    });
    const marker6: Marker = this.map.addMarkerSync({
      icon: mark,
      animation: 'DROP',
      position: {
        lat: 34.044480,
        lng: -118.238240
      }
    });

    const htmlInfoWindow6 = new HtmlInfoWindow();
    const frame6: HTMLElement = document.createElement('div');

    frame6.innerHTML = `
<div class="flip-container" id="flip-container">
  <div class="flipper">
    <div class="front">
    <h3>XLanes LA</h3>

  </div>
  <div class="back">
    <!-- back content -->
    333 Alameda St #300, Los Angeles, CA 90013
    <button><a href="maps:?q=34.044480,-118.238240" target="_system">Map</a>Open Maps</button>
    </div>
  </div>
</div>`;

    htmlInfoWindow6.setContent(frame6, {
      width: '280px',
      height: '150px'
    });
    marker6.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      htmlInfoWindow6.open(marker6);
    });
    const marker7: Marker = this.map.addMarkerSync({
      icon: mark,
      animation: 'DROP',
      position: {
        lat: 34.011730,
        lng: -118.282960
      }
    });

    const htmlInfoWindow7 = new HtmlInfoWindow();
    const frame7: HTMLElement = document.createElement('div');

    frame7.innerHTML = `
<div class="flip-container" id="flip-container">
  <div class="flipper">
    <div class="front">
    <h3>Free Play Arcade</h3>

  </div>
  <div class="back">
    <!-- back content -->
    3939 S Figueroa St, Los Angeles, CA 90037
    <button><a href="maps:?q=34.011730,-118.282960" target="_system">Map</a>Open Maps</button>
    </div>
  </div>
</div>`;

    htmlInfoWindow7.setContent(frame7, {
      width: '280px',
      height: '150px'
    });
    marker7.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      htmlInfoWindow7.open(marker7);
    });
    const marker8: Marker = this.map.addMarkerSync({
      icon: mark,
      animation: 'DROP',
      position: {
        lat: 34.145169,
        lng: -118.148582
      }
    });

    const htmlInfoWindow8 = new HtmlInfoWindow();
    const frame8: HTMLElement = document.createElement('div');

    frame8.innerHTML = `
<div class="flip-container" id="flip-container">
  <div class="flipper">
    <div class="front">
    <h3>Neon Retro Arcade</h3>

  </div>
  <div class="back">
    <!-- back content -->
    28 S Raymond Ave, Pasadena, CA 91105
    <button><a href="maps:?q=34.145169,-118.148582" target="_system">Map</a>Open Maps</button>
    </div>
  </div>
</div>`;

    htmlInfoWindow8.setContent(frame8, {
      width: '280px',
      height: '150px'
    });
    marker8.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      htmlInfoWindow8.open(marker8);
    });
  }
}

// class Custom {
//   const pic: {
//     url: '/Users/txt-14/Desktop/RetroMe/src/assets/FamilyAmusement.jpeg'
//   };
//   NameofArcade: string;
//   address: string;
//   DailyHours: string;
//   Directions: string;
//   // image: pic;
// }
