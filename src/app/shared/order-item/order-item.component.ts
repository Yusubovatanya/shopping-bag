import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() order: Product;
  @Output() changeQty = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  selectedValue = "1";

  constructor() { }

  ngOnInit() {
    if (!this.order.qty) {
      this.order.qty = this.selectedValue;
    } else {
      this.selectedValue = this.order.qty + "";
    }
  }

  changeValueQty() {
    this.order.qty = this.selectedValue;
    this.changeQty.emit(this.order);
  }

  subtotalPrice() {
    return +this.order.qty * this.order.price
  }

  deleteProduct() {
    this.delete.emit(this.order);
  }
}
