import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';
  private cartData: { product: any[],  totalItem: number} = {
    product: [],
    totalItem: 0
  };

  constructor() {
    this.loadCartData();
  }

  private loadCartData() {
    const cartData = localStorage.getItem(this.cartKey);
    if (cartData) {
      this.cartData = JSON.parse(cartData);
    }
  }

  getCartData() {
    return this.cartData;
  }

  updateCartData(newCartData: any) {
    this.cartData = newCartData;
    localStorage.setItem(this.cartKey, JSON.stringify(newCartData));
  }

  getCartTotalItems() {
    return this.cartData.totalItem;
  }

  addToCart(id: number) {
    let list = this.cartData.product;
    let item = list.find((item: any) => item.id == id);
    if (item) {
      item.quantity++;
    } else {
      list.push({
        id, quantity: 1
      })
    }
    this.cartData.totalItem++;
    this.updateCartData(this.cartData);
  }
  minusFromCart(id: number) {
    let list = this.cartData.product;
    let item = list.find((item: any) => item.id == id);
    item.quantity--;
    this.cartData.totalItem--;
    this.cartData.product = this.cartData.product.filter((item: any) => item.quantity > 0);
    this.updateCartData(this.cartData);
  }
  displayQuantity(id : number) {
    let list = this.cartData.product;
    let item = list.find((item: any) => item.id == id);
    return item?.quantity || 0;
  }
  removeFromCart(id: number) {
    let list = this.cartData.product;
    let item = list.find((item: any) => item.id == id);
    this.cartData.totalItem -= item?.quantity;
    this.cartData.product = this.cartData.product.filter((item: any) => item.id != id);
    this.updateCartData(this.cartData);
  }
}
