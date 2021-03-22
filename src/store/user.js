import {observable, action, makeObservable} from 'mobx';

export class User {
  @observable
  info = undefined;

  constructor(info) {
    this.info = info;
    makeObservable(this);
  }

  @action
  setInfo = (value) => {
    this.info = value;
  };
}
