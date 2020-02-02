import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EtuCatalogueCoPage } from './etu-catalogue-co.page';

const routes: Routes = [
  {
    path: '',
    component: EtuCatalogueCoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EtuCatalogueCoPage]
})
export class EtuCatalogueCoPageModule {}
