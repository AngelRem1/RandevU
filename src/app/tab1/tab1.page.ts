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
import { DomSanitizer } from '@angular/platform-browser';

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
  public description;
  public hours;
  public phone;
  public address;
  public maps;
  public target;
  public place;
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
              public changeDetection: ChangeDetectorRef, public sanitizer: DomSanitizer) {
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
      this.maps = this.sanitizer.bypassSecurityTrustUrl('maps:?q=34.087520,-118.291480');
      this.target = '_system';
      // tslint:disable-next-line:max-line-length
      this.description = 'Family Arcade has been around for more than 40 years! A player’s arcade with all the up to date equipment sprinkled with nostalgia and classic equipment situated in a back in time neon setting that keep our loyal players coming back';
      this.place = 'assets/FamilyAmusement2.jpg';
      this.hours = '8:30AM - 1:30AM (Mon-Sun)';
      this.phone = '(323) 660-8180 ';
      this.address = '876 N Vermont Ave, Los Angeles, CA 90029';
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
      this.name = 'Jimenez Arcade';
      this.maps = this.sanitizer.bypassSecurityTrustUrl('maps:?q=34.054930,-118.273460');
      this.description = '';
      this.place = 'assets/Jimenezarcade.jpg';
      this.hours = '(Mon-Thurs)1AM–10PM (Fri-Sun)	11:30AM–11:00PM';
      this.phone = '(213) 713-6262';
      this.address = '2128 7th St, Los Angeles, CA 90057';
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
      this.name = 'One More Round Arcade';
      this.maps = this.sanitizer.bypassSecurityTrustUrl('maps:?q=33.980000,-118.220000');
      this.description = '';
      this.place = 'assets/Onemore.jpg';
      this.hours = '12AM-10PM (Mon-Sun)';
      this.phone = '(213) 713-6262';
      this.address = '6322025047, Huntington Park, CA 90255';
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
      this.name = 'Moon Age Reality Arcade';
      this.maps = this.sanitizer.bypassSecurityTrustUrl('maps:?q=34.041350,-118.214075');
      // tslint:disable-next-line:max-line-length
      this.description = 'Explore this newly built arcade, not only is it family friendly, but also modernized within this fine establishment not only is it old school with arcades, but it also has VR';
      this.place = 'assets/MoonAge.png';
      this.hours = '(Mon-Tues)Closed, (Wed-Thu)6:00PM-10:00PM, (Fri)4:00 PM-11:00PM, (Sun-Thur)11AM-11PM';
      this.phone = '(323) 604-9661';
      this.address = '2208 E 4th St, Los Angeles, CA 90033';
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
      this.name = 'XLanes LA';
      this.maps = this.sanitizer.bypassSecurityTrustUrl('maps:?q=34.044480,-118.238240');
      this.description = 'Arcade games , splashy bowling alley & restaurant offering American grub, a sports bar & more';
      this.place = 'assets/Xlanes.png';
      this.hours = '(Mon-Wed)11:30AM–12AM, (Thur)11:30AM–1AM, (Fri-Sat)11:30AM–2AM, (Sun)10AM–12AM';
      this.phone = '(213) 229-8910';
      this.address = '333 Alameda St #300, Los Angeles, CA 90013';
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
      this.name = 'Free Play Arcade';
      this.maps = this.sanitizer.bypassSecurityTrustUrl('maps:?q=34.011730,-118.282960');
      this.description = 'vintage-style video games arcade located within Exposition Park';
      this.place = 'assets/Freeplayarcade.jpg';
      this.hours = '(Mon-Tues)Closed, (Wed)3PM–12AM, (Thursday)3PM–1:30AM, (Fri-Sun)3PM–12AM';
      this.phone = '(213) 419-9481';
      this.address = '3939 S Figueroa St, Los Angeles, CA 90037';
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
      this.name = 'Neon Retro Arcade';
      this.maps = this.sanitizer.bypassSecurityTrustUrl('maps:?q=34.145169,-118.148582');
      // tslint:disable-next-line:max-line-length
      this.description = 'Neon Retro Arcade recreates the retro arcade experience for a new generation of gamers to enjoy the classics that launched the video game revolution. Kids walk in and enjoy seeing where their favorite characters began; adults walk in and are instantly transported back to their childhood when playing the latest game meant meeting your friends at the arcade';
      this.place = 'assets/RetroArcade.jpg';
      this.hours = '(Mon-Thur)12AM–10PM, (Fri-Sat)12PM–12AM, (Sunday)11AM–9PM';
      this.phone = '(626) 568-2924';
      this.address = '28 S Raymond Ave, Pasadena, CA 91105';
      this.state = DrawerState.Docked;
      // this.isActive = true;
      this.changeDetection.detectChanges();
    });
  }
}
