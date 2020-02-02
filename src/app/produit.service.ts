import { Injectable, Query } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  produits: AngularFireList<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.produits = database.list('produits');
  }

  getProduits(): AngularFireList<any[]> {
    return this.produits;
  }

  searchProduits(start, end): AngularFireList<any[]> {
    return this.database.list('/produits', ref => ref.orderByChild('title').limitToFirst(10).startAt(start).endAt(end));
  }

}


