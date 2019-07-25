import { MarkerSharingService } from '../marker-sharing.service';
import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  Name: string;
  Hours: string;
  constructor(public modalController: ModalController, private markerService: MarkerSharingService) { }

  ngOnInit() {
    this.Name = this.markerService.getArcadeName(this.Name);
    console.log(this.Name, 'Calling nameOfArcade');
    this.Hours = this.markerService.getHours();
    console.log(this.Hours, 'Calling hours');
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
