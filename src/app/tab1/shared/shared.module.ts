import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
@NgModule({
    declarations: [ModalPage],
    exports: [ModalPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CommonModule,
    ]
})
export class SharedModule { }
