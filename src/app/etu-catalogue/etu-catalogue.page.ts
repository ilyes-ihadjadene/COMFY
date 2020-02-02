import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProduitService } from '../produit.service';
import { Produit } from 'src/model/produits';
import { PannierService } from '../pannier.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-etu-catalogue',
  templateUrl: './etu-catalogue.page.html',
  styleUrls: ['./etu-catalogue.page.scss']
})
export class EtuCataloguePage implements OnInit, DoCheck  {
  produits: Produit[] = [];
  notif: number = 0;
  quantite: number = 0;
  // lastChoice : number = 1;
  startAt = '';
  endAt = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private produitService: ProduitService,
    private panierService: PannierService,
    private menu: MenuController
  ) {}

  ngDoCheck() {
    if(sessionStorage.getItem('panier') !== null){
      this.notif = JSON.parse(sessionStorage.getItem("panier")).length;
    }
  }

  back() {
    this.router.navigate(['']);
  }

  pannier() {
    this.router.navigate(['pannier']);
  }

  addPageEtudlog() {
    this.router.navigate(['etudiant-log']);
  }


  addToCart(item: Produit) {
    const id = item.id + '-select-value';
    const el = document.getElementById(id);    
    var value = parseInt(el.children[el.children.length - 1].getAttribute('value'), 10)
    if (!value){
      value = 1;
    }
    this.panierService.addToCart(item, value);
    this.notif = JSON.parse(sessionStorage.getItem('panier')).length;
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

  loginGoogle() {
    this.auth.loginGoogle();
  }
}
