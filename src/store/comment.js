import {observable, action, makeObservable} from 'mobx';

export class Comment {
  @observable
  postComment = undefined;

  @observable
  bookComment = undefined;

  constructor(postComment, bookComment) {
    this.postComment = postComment;
    this.bookComment = bookComment;
    makeObservable(this);
  }

  @action
  setPostComment = (value) => {
    this.postComment = value;
  };

  @action
  setBookComment = (value) => {
    this.bookComment = value;
  };

  @action
  setComment = ({book, post}) => {
    this.post = post;
    this.book = book;
  };
}
