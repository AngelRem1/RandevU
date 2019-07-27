import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private emailComposer: EmailComposer) {}
  sendEmail() {
    const email = {
      to: 'Bringretrotoyou@gmail.com',
      cc: 'Bringretrotoyou@gmail.com',
      subject: 'Arcade Location',
      body: 'Provide Arcade Info, Name:  , Address: , Phone Number: , Daily Hours: ',
      isHtml: true
    };

    this.emailComposer.open(email);
  }
}
