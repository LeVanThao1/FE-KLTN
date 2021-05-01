import {observable, action, makeObservable} from 'mobx';

export class Order {
  @observable
  infoOrder = undefined;

  constructor(infoOrder) {
    this.infoOrder = infoOrder;
    makeObservable(this);
  }

  @action
  setInfoOrder = (value) => {
    this.infoOrder = value;
  };
}
