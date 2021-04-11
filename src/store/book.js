import {observable, action, makeObservable} from 'mobx';

export class Book {
  @observable
  books = undefined;

  constructor(books) {
    this.books = books;
    makeObservable(this);
  }

  @action
  setBooks = (value) => {
    this.books = value;
  };
}
