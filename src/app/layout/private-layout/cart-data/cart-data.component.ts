import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart-service/cart.service";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzTableModule} from "ng-zorro-antd/table";
import {LoadImage} from "../../../environment/load-image";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTransitionPatchModule} from "ng-zorro-antd/core/transition-patch/transition-patch.module";

@Component({
  selector: 'app-cart-data',
  templateUrl: './cart-data.component.html',
  styleUrls: ['./cart-data.component.scss'],
  standalone: true,

  imports: [
    NgIf,
    NzEmptyModule,
    NzTableModule,
    NgForOf,
    CurrencyPipe,
    NzIconModule,
  ]
})
export class CartDataComponent {
  @Input() cartModalData! : any[];

  constructor(private _cartService: CartService
  ) { }

  displayQuantity(id : number) {
    return this._cartService.displayQuantity(id);
  }
  addToCart(id: number) {
    this._cartService.addToCart(id);
  }
  minusFromCart(id: number) {
    this._cartService.minusFromCart(id);
    let quantity = this.displayQuantity(id);
    if (!quantity) {
      this.cartModalData.forEach((item : any) => {
        item.subProducts = item.subProducts.filter((sub: any) => sub.id != id);
      })
      this.cartModalData = this.cartModalData.filter((item: any) => item.subProducts.length);
    }
  }
  removeFromCart(id: number) {
    this._cartService.removeFromCart(id);
    this.cartModalData.forEach((item : any) => {
      item.subProducts = item.subProducts.filter((sub: any) => sub.id != id);
    })
    this.cartModalData = this.cartModalData.filter((item: any) => item.subProducts.length);
    console.log(this.cartModalData)
  }
  protected readonly LoadImage = LoadImage;
}
