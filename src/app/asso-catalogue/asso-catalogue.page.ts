import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProduitService } from '../produit.service';
import { Produit } from 'src/model/produits';
import { PannierService } from '../pannier.service';


@Component({
  selector: 'app-asso-catalogue',
  templateUrl: './asso-catalogue.page.html',
  styleUrls: ['./asso-catalogue.page.scss']
})
export class AssoCataloguePage implements OnInit {
  data: object;
  notif: number = 0;
  produits: Produit[];

  startAt = '';
  endAt = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private produitService: ProduitService,
    private panierService: PannierService

  ) {}

  addToCart_asso(item: Produit) {
    const id = item.id + '-select-value';
    const el = document.getElementById(id);    
    var value = parseInt(el.children[el.children.length - 1].getAttribute('value'), 10)
    if (!value){
      value = 1;
    }
    this.panierService.addToCart_asso(item, value);
    this.notif = JSON.parse(sessionStorage.getItem('panier_asso')).length;
  }
  

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
    this.data = JSON.parse(localStorage.getItem('userEP'));
    // this.albums = this.produitService.getAlbums();

    this.produitService
      .getProduits()
      .valueChanges()
      .subscribe(res => {
        this.produits = [];
        res.forEach((element: any) => {
          this.produits.push(element);
        });
      });

      if(sessionStorage.getItem('panier_asso') !== null){
        this.notif = JSON.parse(sessionStorage.getItem("panier_asso")).length;
      }
  }

  signoutEmailPassword() {
    this.auth.signoutEmailPassword();
  }

  pannier() {
    this.router.navigate(['panier-asso']);
  }

}
