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
import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DrawerState } from 'ion-bottom-drawer';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  // instance variables
  public show = false;
  public state = DrawerState.Bottom;
  public isActive = false;
  public name;
  map: GoogleMap;
  public height = 0;
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
              public modalController: ModalController, private markerService: MarkerSharingService, public zone: NgZone,
              public changeDetection: ChangeDetectorRef) {
  }

  // methods
  async presentModal() {
    const arcade = this.Arcades[0];

    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        name: arcade.Name,
        hours: arcade.Hours
      }
    });

    modal.present();
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


    const marker2: Marker = this.map.addMarkerSync({
      icon: mark,
      animation: 'DROP',
      position: {
        lat: 34.087520,
        lng: -118.291480
      }
    });


    marker2.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      console.log('click');
      this.name = 'Family Amusement Coorporation';
      this.state = DrawerState.Docked;
      // this.isActive = true;
      this.changeDetection.detectChanges();
    });
    const marker3: Marker = this.map.addMarkerSync({
      icon: mark,
      animation: 'DROP',
      position: {
        lat: 34.054930,
        lng: -118.273460
      }
    });

    marker3.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      console.log('click');
      this.state = DrawerState.Docked;
      // this.isActive = true;
      this.changeDetection.detectChanges();
    });
    const marker4: Marker = this.map.addMarkerSync({
      icon: mark,
      animation: 'DROP',
      position: {
        lat: 33.980000,
        lng: -118.220000
      }
    });

    marker4.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      console.log('click');
      this.state = DrawerState.Docked;
      // this.isActive = true;
      this.changeDetection.detectChanges();
    });
    const marker5: Marker = this.map.addMarkerSync({
      icon: mark,
      animation: 'DROP',
      position: {
        lat: 34.041350,
        lng: -118.214075,
      }
    });

    marker5.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      console.log('click');
      this.state = DrawerState.Docked;
      // this.isActive = true;
      this.changeDetection.detectChanges();
    });
    const marker6: Marker = this.map.addMarkerSync({
      icon: mark,
      animation: 'DROP',
      position: {
        lat: 34.044480,
        lng: -118.238240
      }
    });

    marker6.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      console.log('click');
      this.state = DrawerState.Docked;
      // this.isActive = true;
      this.changeDetection.detectChanges();
    });
    const marker7: Marker = this.map.addMarkerSync({
      icon: mark,
      animation: 'DROP',
      position: {
        lat: 34.011730,
        lng: -118.282960
      }
    });


    marker7.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      console.log('click');
      this.state = DrawerState.Docked;
      // this.isActive = true;
      this.changeDetection.detectChanges();
    });
    const marker8: Marker = this.map.addMarkerSync({
      icon: mark,
      animation: 'DROP',
      position: {
        lat: 34.145169,
        lng: -118.148582
      }
    });

    marker8.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      console.log('click');
      this.state = DrawerState.Docked;
      // this.isActive = true;
      this.changeDetection.detectChanges();
    });
  }
}
