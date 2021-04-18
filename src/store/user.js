import {observable, action, makeObservable} from 'mobx';

export class User {
  @observable
  info = undefined;

  @observable
  cart = undefined;

  @observable
  posts = undefined;

  constructor(info, cart, post) {
    this.cart = cart;
    this.info = info;
    this.posts = post;
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
}
