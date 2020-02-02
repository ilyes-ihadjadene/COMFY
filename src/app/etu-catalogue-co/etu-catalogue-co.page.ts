import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProduitService } from '../produit.service';
import { Produit } from 'src/model/produits';
import { PannierService } from '../pannier.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-etu-catalogue-co',
  templateUrl: './etu-catalogue-co.page.html',
  styleUrls: ['./etu-catalogue-co.page.scss']
})
export class EtuCatalogueCoPage implements OnInit {
  data: object;
  produits: Produit[];
  notif: number = 0;
  quantite: number = 0;

  
  startAt = '';
  endAt = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private produitService: ProduitService,
    private panierService: PannierService
  ) {}

  search($event) {
    const q = $event.target.value;
    this.startAt = q;
    this.endAt = q + '\uf8ff';

    this.produitService
      .searchProduits(this.startAt.toLowerCase(), this.endAt.toLowerCase())
      .valueChanges()
      .subscribe(res => {
        this.produits = [];
        res.forEach((element: any) => {
          this.produits.push(element);
        });
      });
  }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('user'));

    this.auth.authenticationState.subscribe(state => {
      console.log('status', state);
      if (state) {
        this.router.navigate(['etu-catalogue-co']);
      } else {
        this.router.navigate(['etu-catalogue']);
      }
    });
    this.produitService
      .getProduits()
      .valueChanges()
      .subscribe(res => {
        this.produits = [];
        res.forEach((element: any) => {
          this.produits.push(element);
        });
      });
      if(sessionStorage.getItem('panier') !== null){
        this.notif = JSON.parse(sessionStorage.getItem("panier")).length;
      }
  }

  signOutGoogle() {
    this.auth.signOutGoogle();
  }

  pannier() {
    this.router.navigate(['pannier']);
  }

  addToCart_co(item: Produit) {
    const id = item.id + '-select-value';
    const el = document.getElementById(id);    
    var value = parseInt(el.children[el.children.length - 1].getAttribute('value'), 10)
    if (!value){
      value = 1;
    }
    this.panierService.addToCart_co(item, value);
    this.notif = JSON.parse(sessionStorage.getItem('panier')).length;
  }
}
