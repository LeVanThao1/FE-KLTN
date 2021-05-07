import {observable, action, makeObservable} from 'mobx';

export class CreateBook {
  @observable
  name = {
    value: '',
    error: '',
  };

  @observable
  author = {
    value: '',
    error: '',
  };

  @observable
  year = {
    value: '',
    error: '',
  };

  @observable
  publisher = {
    value: '',
    error: '',
  };

  @observable
  numPrint = {
    value: 0,
    error: '',
  };

  @observable
  description = {
    value: '',
    error: '',
  };

  @observable
  price = {
    value: 0,
    error: '',
  };

  @observable
  amount = {
    value: 0,
    error: '',
  };

  @observable
  book = undefined;

  @observable
  booksRecomment = undefined;

  constructor(
    name,
    author,
    year,
    publisher,
    numPrint,
    description,
    price,
    amount,
    book,
    booksRecomment,
  ) {
    this.name = name;
    this.author = author;
    this.year = year;
    this.publisher = publisher;
    this.numPrint = numPrint;
    this.description = description;
    this.price = price;
    this.amount = amount;
    this.book = book;
    this.booksRecomment = booksRecomment;
    makeObservable(this);
  }

  @action
  setName = (value) => {
    this.name = value;
  };

  @action
  setAuthor = (value) => {
    this.author = value;
  };

  @action
  setYear = (value) => {
    this.year = value;
  };
  @action
  setPublisher = (value) => {
    this.publisher = value;
  };
  @action
  setNumPrint = (value) => {
    this.numPrint = value;
  };
  @action
  setDescription = (value) => {
    this.description = value;
  };
  @action
  setPrice = (value) => {
    this.price = value;
  };
  @action
  setAmount = (value) => {
    this.amount = value;
  };
  @action
  setBook = (value) => {
    this.book = value;
  };
  @action
  setBooksRecomment = (value) => {
    this.booksRecomment = value;
  };
}
