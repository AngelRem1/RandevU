import { Platform } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  map: GoogleMap;
  constructor(private platform: Platform) {}

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }
  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      // tslint:disable-next-line:object-literal-key-quotes
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyC4u5dqJyoNgizRbD-ZaEul0YKOmrVtkBo',
      // tslint:disable-next-line:object-literal-key-quotes
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyC4u5dqJyoNgizRbD-ZaEul0YKOmrVtkBo'
    });

    const mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    const marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }
}
