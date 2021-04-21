import {observable, action, makeObservable} from 'mobx';

export class User {
  @observable
  info = undefined;

  @observable
  cart = undefined;

  @observable
  posts = undefined;

  @observable
  subOrders = [];

  constructor(info, cart, post, subOrders) {
    this.cart = cart;
    this.info = info;
    this.posts = post;
    this.subOrders = subOrders;
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
  @action
  setPosts = (posts) => {
    this.posts = posts;
  };
  @action
  setSubOrder = (orders) => {
    this.subOrders = subOrders;
  };
}
