import {observable, action, makeObservable} from 'mobx';

export class Category {
  @observable
  categories = undefined;

  @observable
  selectCategory = undefined;

  @observable
  option = undefined;

  constructor(categories, selectCategory, option) {
    this.categories = categories;
    this.selectCategory = selectCategory;
    this.option = option;
    makeObservable(this);
  }

  @action
  setCategory = (value) => {
    this.categories = value;
  };
  @action
  setOption = (value) => {
    this.option = value;
  };
  @action
  setSelectCategory = (value) => {
    this.selectCategory = value;
  };
}
