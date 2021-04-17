import {observable, action, makeObservable} from 'mobx';

export class Category {
  @observable
  categories = undefined;

  constructor(categories) {
    this.categories = categories;
    makeObservable(this);
  }

  @action
  setCategory = (value) => {
    this.categories = value;
  };
}
