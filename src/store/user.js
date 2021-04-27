import {observable, action, makeObservable} from 'mobx';

export class User {
  @observable
  info = undefined;

  @observable
  cart = undefined;

  @observable
  posts = undefined;

  @observable
  postCurrent = undefined;

  @observable
  subOrders = [];

  @observable
  likes = [];

  constructor(info, cart, post, subOrders, likes, postCurrent) {
    this.cart = cart;
    this.info = info;
    this.posts = post;
    this.subOrders = subOrders;
    this.likes = likes;
    this.postCurrent = postCurrent;
    makeObservable(this);
  }

  @action
  setPostCurrent = (value) => {
    this.postCurrent = value;
  };

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
