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
  bookCurrent = undefined;

  @observable
  subOrders = [];

  @observable
  likes = [];

  constructor(info, cart, posts, subOrders, likes, postCurrent, bookCurrent) {
    this.cart = cart;
    this.info = info;
    this.posts = posts;
    this.subOrders = subOrders;
    this.likes = likes;
    this.postCurrent = postCurrent;
    this.bookCurrent = bookCurrent;
    makeObservable(this);
  }

  @action
  setPostCurrent = (value) => {
    this.postCurrent = value;
  };

  @action
  setBookCurrent = (value) => {
    this.bookCurrent = value;
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
  addToLike = (value) => {
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
