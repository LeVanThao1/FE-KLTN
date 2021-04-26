import {observable, action, makeObservable} from 'mobx';

export class Comment {
  @observable
  post = undefined;

  @observable
  book = undefined;

  constructor(post, book) {
    this.post = post;
    this.book = book;
    makeObservable(this);
  }

  @action
  setPostComment = (value) => {
    this.post = value;
  };

  @action
  setBookComment = (value) => {
    this.book = value;
  };

  @action
  setComment = ({book, post}) => {
    this.post = post;
    this.book = book;
  };
}
