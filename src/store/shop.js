import {observable, action, makeObservable} from 'mobx';

export class Shop {
  @observable
  info = undefined;

  @observable
  bookStore = undefined;

  @observable
  orderStore = undefined;

  constructor(info, bookStore, orderStore) {
    this.info = info;
    this.bookStore = bookStore;
    this.orderStore = orderStore;
    makeObservable(this);
  }

  @action
  setInfo = (value) => {
    this.info = value;
  };

  @action
  setBookStore = (value) => {
    this.bookStore = value;
  };

  @action
  setOrderStore = (value) => {
    this.orderStore = value;
  };
}
