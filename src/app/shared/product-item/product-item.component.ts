import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Output() addProduct = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {
  }

  addToBag() {
    this.addProduct.emit(this.product);
  }

}
