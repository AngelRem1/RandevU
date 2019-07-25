import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { ModalPage } from './modal.page';
import { Tab1Page } from '../tab1.page';
const routes: Routes = [
  {
    path: '',
    component: ModalPage
  },
  {
    path: '../tab1/tab1.page',
    component: Tab1Page
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class ModalPageModule {}
