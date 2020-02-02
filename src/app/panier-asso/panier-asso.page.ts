import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PannierService } from '../pannier.service';
import { Panier } from '../pannier.service';
import { Produit } from '../../model/produits';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from '@ionic/angular';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-panier-asso',
  templateUrl: './panier-asso.page.html',
  styleUrls: ['./panier-asso.page.scss'],
})

export class PanierAssoPage implements OnInit {
  panier_asso: Panier[] = [];
  // panier: any;
  // data: any;
  data = JSON.parse(localStorage.getItem('userEP'));
  panier = JSON.parse(sessionStorage.getItem('panier_asso'));

  constructor(private router: Router,
              private panierService: PannierService,
              private database: AngularFireDatabase,
              private alertController: AlertController,
              private auth: AuthService
  ) {}
              
  back(){
    this.router.navigate(['asso-catalogue']);
  }

  ngOnInit() {
   this.panier_asso = this.getPanier_asso();
  }

  getPanier_asso() {
  return this.panierService.getPanier_asso();
  }

  remove_asso(produit: Produit) {
    this.panierService.removeFromCart_asso(produit);
    this.panier_asso = this.getPanier_asso();
  }
  


  async send_to_bdd(panier,data){
    var auth = false;
    this.auth.authenticationState.subscribe(state => {
      auth = state;
    });


     if(this.panier_asso.length < 1 || this.panier_asso == undefined || !auth){
        console.log('panier vide');
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: 'Error commande',
            message: 'Panier vide',
            buttons: ['OK']
         });
         await alert.present();
      }else{
        try {
          firebase.database().ref('customers/').push({
             panier: panier,
            email : data.user
           });
           console.log("done");
            const alert = await this.alertController.create({
               header: 'Bon choix 👍',
               message: 'Commande enregistré',
               buttons: ['OK']
            });
            await alert.present();
            delete this.panier_asso;
           sessionStorage.removeItem('panier_asso'); //vider le panier
        }catch (err) {
          console.dir(err);
          console.log('cannot push');
           const alert = await this.alertController.create({
             header: 'Alert',
             subHeader: 'Error commande',
             message: 'Commande indisponnible',
             buttons: ['OK']
            });
            await alert.present();
        }
      }
    }
  
}
