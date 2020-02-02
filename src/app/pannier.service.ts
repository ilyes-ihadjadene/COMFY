import { Injectable } from '@angular/core';
import { Produit } from '../model/produits';

export interface Panier {
  product: Produit;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class PannierService {
  

  constructor() { }

  public getPanier(): Panier[] {
    return JSON.parse(sessionStorage.getItem('panier')) || [];
  }

  public getPanier_asso(): Panier[] {
    return JSON.parse(sessionStorage.getItem('panier_asso')) || [];
  }

  

// a cote de produit parametre "quantite" et a la place de 1 à la ligne 24 "quantite"
public addToCart(item: Produit, quantite : number) {
  // this.total = 0;

  const localPanier = JSON.parse(sessionStorage.getItem('panier')) || [];
  localPanier.push({product: item, quantity: quantite});
  // this.panier = localPanier;
  sessionStorage.setItem('panier', JSON.stringify(localPanier));
}

public addToCart_co(item: Produit, quantite: number) {
  // this.total = 0;

  const localPanier = JSON.parse(sessionStorage.getItem('panier')) || [];
  localPanier.push({product: item, quantity: quantite});
  // this.panier = localPanier;
  sessionStorage.setItem('panier', JSON.stringify(localPanier));
}

public addToCart_asso(item: Produit, quantite: number) {
  // this.total = 0;

  const localPanier_asso = JSON.parse(sessionStorage.getItem('panier_asso')) || [];
  localPanier_asso.push({product: item, quantity: quantite});
  // this.panier = localPanier;
  sessionStorage.setItem('panier_asso', JSON.stringify(localPanier_asso));
}

  public removeFromCart(produit: Produit) {

    const localPanier: Panier[] = JSON.parse(sessionStorage.getItem('panier'));
    for (let index = 0; index < localPanier.length; index++) {
      // console.log(localPanier[index].product.id === produit.id);
      if ( localPanier[index].product.id === produit.id) {
        // console.log("in if")
        localPanier.splice(index, 1);
        sessionStorage.setItem('panier', JSON.stringify(localPanier));
        return;
      }
    }
  }

  public removeFromCart_asso(produit: Produit) {

    const localPanier_asso: Panier[] = JSON.parse(sessionStorage.getItem('panier_asso'));
    for (let index = 0; index < localPanier_asso.length; index++) {
      // console.log(localPanier[index].product.id === produit.id);
      if ( localPanier_asso[index].product.id === produit.id) {
        // console.log("in if")
        localPanier_asso.splice(index, 1);
        sessionStorage.setItem('panier_asso', JSON.stringify(localPanier_asso));
        return;
      }
    }
  }
  

  
}
