import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PannierService } from '../pannier.service';
import { AuthService } from '../auth.service';
import { Panier } from '../pannier.service';
import { Produit } from '../../model/produits';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-pannier',
  templateUrl: './pannier.page.html',
  styleUrls: ['./pannier.page.scss']
})
export class PannierPage implements OnInit {
  panier: Panier[] = [];
  data = JSON.parse(localStorage.getItem('user'));
  pannier = JSON.parse(sessionStorage.getItem('panier'));



  constructor(private router: Router,
              private panierService: PannierService,
              private auth: AuthService,
              private database: AngularFireDatabase,
              private alertController: AlertController

              ) {}

  back(){
    this.auth.authenticationState.subscribe(state => {
      if (state) {
        this.router.navigate(['etu-catalogue-co']);
      } else {
        this.router.navigate(['etu-catalogue']);
      }
    });
  }

  ngOnInit() {
    this.panier = this.getPanier();
  }

  remove(produit: Produit) {
    this.panierService.removeFromCart(produit);
    this.panier = this.getPanier();

  }

  getPanier() {
    return this.panierService.getPanier();
  }

  async send_to_bdd(panier,data){
    var auth = false;
    this.auth.authenticationState.subscribe(state => {
      auth = state;
    });


     if(this.panier.length < 1 || this.panier == undefined || !auth){
        console.log('panier vide');
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: 'Error commande',
            message: 'Connectez-vous pour pouvoir commannder ou verifiez le contenu de votre panier',
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
            delete this.panier;
           sessionStorage.removeItem('panier'); //vider le panier
        }catch (err) {
          console.dir(err);
          console.log('cannot push');
           const alert = await this.alertController.create({
             header: 'Alert',
             subHeader: 'Error bdd',
             message: 'Commande indisponnible',
             buttons: ['OK']
            });
            await alert.present();
        }
      }
    }

}
