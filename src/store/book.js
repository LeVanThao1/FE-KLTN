import {observable, action, makeObservable} from 'mobx';

export class Book {
  @observable
  books = undefined;
  @observable
  booksSearch = undefined;
  @observable
  textSearch = undefined;
  @observable
  booksCategory = undefined;
  @observable
  stop = false;
  constructor(books, booksSearch, textSearch, booksCategory, stop) {
    this.books = books;
    this.booksSearch = booksSearch;
    this.textSearch = textSearch;
    this.booksCategory = booksCategory;
    this.stop = stop;
    makeObservable(this);
  }
  @action
  setStop = (value) => {
    this.stop = value;
  };
  @action
  setBooks = (value) => {
    this.books = value;
  };

  @action
  setBooksSearch = (value) => {
    this.booksSearch = value;
  };

  @action
  setBooksCategory = (value) => {
    this.booksCategory = value;
  };

  @action
  setTextSearch = (value) => {
    this.textSearch = value;
  };
}
