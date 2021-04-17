import {observable, action, makeObservable} from 'mobx';

export class User {
  @observable
  info = undefined;

  @observable
  cart = undefined;

  constructor(info, cart) {
    this.cart = cart;
    this.info = info;
    makeObservable(this);
  }

  @action
  setInfo = (value) => {
    this.info = value;
  };

  @action
  setCart = (cart) => {
    this.cart = cart;
  };
}
