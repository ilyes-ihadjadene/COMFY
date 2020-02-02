import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'association-log', loadChildren: './association-log/association-log.module#AssociationLogPageModule' },
  { path: 'etu-catalogue', loadChildren: './etu-catalogue/etu-catalogue.module#EtuCataloguePageModule' },
  { path: 'asso-catalogue',
     canActivate: [AuthGuardService],
     loadChildren: './asso-catalogue/asso-catalogue.module#AssoCataloguePageModule' 
    },
  { path: 'pannier', loadChildren: './pannier/pannier.module#PannierPageModule' },
  { path: 'etu-catalogue-co', 
    canActivate: [AuthGuardService],
    loadChildren: './etu-catalogue-co/etu-catalogue-co.module#EtuCatalogueCoPageModule' 
  },
  { path: 'panier-asso', loadChildren: './panier-asso/panier-asso.module#PanierAssoPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
