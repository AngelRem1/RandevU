import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarkerSharingService {
  // instance variable
  Name: string;
  Address: string;
  Hours: string;

  constructor() {
    console.log('init service');
  }
  // set method
  setArcadeName(Name: string) {
    this.Name = Name;
    console.log('setting name', this.Name);
  }
  setHours(Hours: string) {
    this.Hours = Hours;
  }
  // get method
  getArcadeName(Name: string) {
    this.Name = Name;
    console.log('grabbing name', this.Name);
    return this.Name;
  }
  getHours() {
    return this.Hours;
  }
}

// markerService = new MarkerSharingService();
// markerService.setArcadeName('Family Fun');

// const Arcades: any[] = [
//   {
//     Address: '2655',
//     location: 'los angeles',
//     name: 'johns arcade'
//   },
//   {
//     Address: '2655',
//     location: 'los angeles',
//     name: 'john arc'
//   }
// ];

// markerService.setArcadeName(Arcades[0].name);
