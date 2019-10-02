import { Injectable } from '@angular/core';
import { Product } from './shared/models/product.model';
import { of, Subject, BehaviorSubject, observable, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  observerCountOrder = new BehaviorSubject<number>(0);
  countOrder$ = this.observerCountOrder.asObservable();

  observerTotalPrice = new BehaviorSubject<number>(0);
  totalPrice$ = this.observerTotalPrice.asObservable();


  shops: Product[] = [
    { id: 0, title: "Pineapple", price: 10, weight: 0.8, description: "Always fresh, perfect and tasty." },
    { id: 1, title: "Meal", price: 75, weight: 2.5, description: "Always fresh, perfect and tasty." },
    { id: 2, title: "Apple", price: 10, weight: 1.5, description: "Always fresh, perfect and tasty." },
    { id: 3, title: "Pine", price: 10, weight: 1.5, description: "Always fresh, perfect and tasty." },
    { id: 4, title: "Oil", price: 25, weight: 0.8, description: "Always fresh, perfect and tasty.Product of Greece, Italy and Spain" },
    { id: 5, title: "Butter", price: 10, weight: 0.3, description: "Always fresh, perfect and tasty.Milk from grass-fed cows" },
    { id: 6, title: "Watermelon", price: 35, weight: 8.5, description: "Always fresh, perfect and tasty" },
    { id: 7, title: "Cherry", price: 30, weight: 0.5, description: "Always fresh, perfect and tasty." },
    { id: 8, title: "Banana", price: 25, weight: 3.5, description: "Always fresh, perfect and tasty." },
    { id: 9, title: "Fish", price: 25, weight: 0.2, description: "Always fresh, perfect and tasty." },
  ];

  shoppingBag: Product[] = [
    { id: 2, title: "Apple", price: 10, weight: 1.5, description: "Always fresh, perfect and tasty.", qty: '2' },
    { id: 7, title: "Cherry", price: 30, weight: 0.5, description: "Always fresh, perfect and tasty." , qty: '3'},
  ];

  constructor() { }

  getShopProducts() {
    return of(this.shops.slice());
  }

  addProductToBag(product) {
    const foundProduct = this.shoppingBag.find((item: Product) => {
      return item.id === product.id;
    });
    if (foundProduct) {
    } else {
      this.shoppingBag.push(product);
    };
    return of(product);
  }

  getShoppingBag() {
    return of(this.shoppingBag).pipe(
      tap((res: Product[]) => {
        const count = res.length;
        this.observerTotalPrice.next(this.calculateSum(res))
        this.observerCountOrder.next(count);
      })
    )
  }

  calculateSum(list: Product[]) {
    let totalResult = 0;
    list.forEach(element => {
      totalResult += +element.qty * element.price;
    });
    return totalResult;
  }

  changeQty(product) {
    const foundIndex = this.shoppingBag.findIndex((item: Product) => {
      return item.id === product.id;
    });
    this.shoppingBag[foundIndex].qty = product.qty;
    return of(product);
  }

  deleteProduct(product) {
    const foundIndex = this.shoppingBag.findIndex((item: Product) => {
      return item.id === product.id;
    });
    this.shoppingBag.splice(foundIndex, 1);
    return of(product)
  }

}
