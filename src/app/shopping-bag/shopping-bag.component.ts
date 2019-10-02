import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from '../shared/models/product.model';
import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.css']
})
export class ShoppingBagComponent implements OnInit {
  orders: Product[];
  totalPrice: Observable<number>;
  totalWeight: number;
  subscriberShoppingBag$: Subscription;
  isOrder: boolean;
  constructor(public service: ShopService) { }

  ngOnInit() {
    this.subscriberShoppingBag$ = this.service.getShoppingBag().subscribe(
      (res) => {
        this.orders = res;
        this.checkEmptyBag();
      },
      (err) => console.log(err),
    )
    this.totalPrice = this.service.totalPrice$;
  }

  changeProductQty(order) {
    this.service.changeQty(order).pipe(
      switchMap(() => {
        return this.service.getShoppingBag()
      })
    ).subscribe((res) => {
      this.orders = res;
      this.checkEmptyBag();
    }),
      (err) => console.log(err)
  }

  calculateTotalWeight() {
    this.totalWeight = 0;
    this.orders.forEach((order) => {
      this.totalWeight += order.weight * +order.qty;
    })
  }

  deleteOrder(product) {
    this.service.deleteProduct(product).pipe(
      switchMap(() => {
        return this.service.getShoppingBag()
      })
    ).subscribe((res) => {
      this.orders = res;
      this.checkEmptyBag();
    }),
      (err) => console.log(err)
  }

  checkEmptyBag() {
    if (this.orders.length) {
      this.isOrder = true;
      this.calculateTotalWeight();
    } else {
      this.isOrder = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriberShoppingBag$.unsubscribe();
  }
}
