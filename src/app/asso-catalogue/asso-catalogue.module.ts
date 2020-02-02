import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AssoCataloguePage } from './asso-catalogue.page';

const routes: Routes = [
  {
    path: '',
    component: AssoCataloguePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssoCataloguePage]
})
export class AssoCataloguePageModule {
  constructor() {}
}
