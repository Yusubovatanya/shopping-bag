import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/shop.service';
import { Product } from 'src/app/shared/models/product.model';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  products: Product[];
  subscriber$: Subscription;
  
  constructor(
    public service: ShopService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.subscriber$ = this.service.getShopProducts().subscribe((list: Product[]) => {
      this.products = list;
    })
  }

  addToBag(product) {
    product.qty = 1;
    this.service.addProductToBag(product).pipe(
      switchMap(() => {
        return this.service.getShoppingBag()
      })
    ).subscribe((res: Product[]) => {
      console.log(res)
    },
      error => {
        this.router.navigate(['/main', { action: error }]);
      })
  }

  ngOnDestroy(): void {
    this.subscriber$.unsubscribe();
  }
}
