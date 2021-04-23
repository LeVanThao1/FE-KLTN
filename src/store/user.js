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

  @observable
  likes = [];

  constructor(info, cart, post, subOrders, likes) {
    this.cart = cart;
    this.info = info;
    this.posts = post;
    this.subOrders = subOrders;
    this.likes = likes;
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

  @action
  addToLike = (book) => {
    this.likes = [...this.likes, value];
  };

  @action
  setLikes = (value) => {
    this.likes = value;
  };

  @action
  removeToLike = (id) => {
    this.likes = this.likes.filter((lk) => lk.id + '' !== id);
  };
}
