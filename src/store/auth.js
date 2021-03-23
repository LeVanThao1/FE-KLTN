import React, {useState} from 'react';
import {observable, action, makeObservable} from 'mobx';

export class Auth {
  @observable
  isAuth = false;
  constructor(isAuth) {
    this.isAuth = isAuth;
    makeObservable(this);
  }
  @action
  setIsAuth = (value) => {
    this.isAuth = value;
  };
}
