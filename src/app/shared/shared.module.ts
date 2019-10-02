import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { OrderItemComponent } from './order-item/order-item.component';

@NgModule({
  declarations: [
    ProductItemComponent,
    OrderItemComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ProductItemComponent,
    OrderItemComponent
  ]
})

export class SharedModule { }
