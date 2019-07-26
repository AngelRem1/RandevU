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
  @Input() name;
  @Input() hours;

  constructor(public modalController: ModalController, private markerService: MarkerSharingService) { }

  ngOnInit() {
    console.log(this.name);
    console.log(this.hours);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
