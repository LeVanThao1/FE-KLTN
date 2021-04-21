import {observable, action, makeObservable} from 'mobx';

export class Notification {
  @observable
  post = undefined;

  @observable
  book = undefined;

  @observable
  order = undefined;

  constructor(post, book, order) {
    this.post = post;
    this.book = book;
    this.order = order
    makeObservable(this);
  }

  @action
  setPost= (value) => {
    this.post = value;
  };

  @action
  setBook = (value) => {
    this.book = value;
  };
  @action
  setOrder = (value) => {
    this.order = value;
  };

  @action
  setAllNotification = ({order, book, post}) => {
    this.post = post;
    this.book = book;
    this.order = order;
  }
}
