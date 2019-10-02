import { Component } from '@angular/core';
import { ShopService } from './shop.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  count: Observable<number>;
  totalPrice: Observable<number>;
  subscriber$: Subscription;
  
  constructor(public service: ShopService) {

  }
  ngOnInit() {
    this.subscriber$ = this.service.getShoppingBag().subscribe(
      (res) => {
        console.log(res)
      }
    )
    this.count = this.service.countOrder$;
    this.totalPrice = this.service.totalPrice$;
  }

  ngOnDestroy(): void {
    this.subscriber$.unsubscribe();
  }

}
