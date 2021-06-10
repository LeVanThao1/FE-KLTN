import {observable, action, makeObservable} from 'mobx';

export class Post {
  @observable
  general = undefined;

  constructor(general) {
    this.general = general;
    makeObservable(this);
  }

  @action
  setGeneral = (value) => {
    this.general = value;
  };
}
