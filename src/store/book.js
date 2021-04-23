import {observable, action, makeObservable} from 'mobx';

export class Book {
  @observable
  books = undefined;
  @observable
  booksSearch = undefined;
  @observable
  textSearch = undefined;
  constructor(books, booksSearch, textSearch) {
    this.books = books;
    this.booksSearch = booksSearch;
    this.textSearch = textSearch;
    makeObservable(this);
  }

  @action
  setBooks = (value) => {
    this.books = value;
  };

  @action
  setBooksSearch = (value) => {
    this.booksSearch = value;
  };

  @action
  setTextSearch = (value) => {
    this.textSearch = value;
  };
}
