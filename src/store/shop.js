import {observable, action, makeObservable} from 'mobx';

export class Shop {
  @observable
  info = undefined;

  @observable
  bookStore = undefined;
  constructor(info, bookStore) {
    this.info = info;
    this.bookStore = bookStore;
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
}
