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
  constructor(books, booksSearch, textSearch, booksCategory) {
    this.books = books;
    this.booksSearch = booksSearch;
    this.textSearch = textSearch;
    this.booksCategory = booksCategory;
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
  setBooksCategory = (value) => {
    this.booksCategory = value;
  };

  @action
  setTextSearch = (value) => {
    this.textSearch = value;
  };
}
