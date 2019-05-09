import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Item } from '../models/Item';
import { Observable } from 'rxjs';


@Injectable()
export class ItemService {
itemCollection: AngularFirestoreCollection<Item>;
items: Observable<Item[]>;
  constructor(public afs:AngularFirestore) {
    this.items = afs.collection('items').valueChanges();
   }
}
