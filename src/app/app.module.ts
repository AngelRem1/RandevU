// import { MarkerSharingService } from './tab1/marker-sharing.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalPage } from './tab1/modal/modal.page';
import { CreateComponent } from './create/create.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { IonBottomDrawerModule } from 'ion-bottom-drawer';

@NgModule({
  declarations: [AppComponent, CreateComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonBottomDrawerModule],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    // MarkerSharingService,
    ModalPage,
    InAppBrowser,
    EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
