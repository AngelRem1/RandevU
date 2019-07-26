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
    // console.log('init service');
  }
  // set method
  setArcadeName(Name: string) {
    this.Name = Name;
    console.log('Nombre', this.Name);
    return this.Name;
  }
  setHours(Hours: string) {
    this.Hours = Hours;
    console.log('Horas', this.Hours);
    return this.Hours;
  }
  // get method
  getArcadeName(Name: string) {
    this.Name = Name;
    console.log('grabbing name', this.Name);
    return this.Name;
  }
  getHours(Name: string) {
    console.log('getting Hours', this.Hours);
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
