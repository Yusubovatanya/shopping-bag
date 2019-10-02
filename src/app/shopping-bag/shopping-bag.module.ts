import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingBagRoutingModule } from './shopping-bag-routing.module';
import { ShoppingBagComponent } from './shopping-bag.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ShoppingBagComponent],
  imports: [
    CommonModule,
    ShoppingBagRoutingModule,
    AppMaterialModule,
    SharedModule
  ]
})
export class ShoppingBagModule { }
