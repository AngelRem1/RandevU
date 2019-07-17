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
import { ModalPage } from '../modal/modal.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

declare var google;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  map: GoogleMap;
  constructor(private geolocation: Geolocation, private platform: Platform, public modalController: ModalController,
    private iab: InAppBrowser) { }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage
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
      url: 'data:image/png;base64,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',
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

    const htmlInfoWindow = new HtmlInfoWindow();
    const frame: HTMLElement = document.createElement('div');

    frame.innerHTML = `
<div class="flip-container" id="flip-container">
  <div class="flipper">
    <div class="front">
    <h3>Your Current Location</h3>
  <div class="back">
    <!-- back content -->
    </div>
  </div>
</div>`;

    htmlInfoWindow.setContent(frame, {
      width: '280px',
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      htmlInfoWindow.open(marker);
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
  </div>
</div>`;

    htmlInfoWindow2.setContent(frame2, {
      width: '280px',
      height: '150px'
    });
    marker2.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      htmlInfoWindow2.open(marker2);
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
  </div>
</div>`;

    htmlInfoWindow3.setContent(frame3, {
      width: '280px',
      height: '150px'
    });
    marker3.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      htmlInfoWindow3.open(marker3);
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
        lng: -118.213980
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
