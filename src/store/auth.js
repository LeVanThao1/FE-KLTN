import {observable, action, makeObservable} from 'mobx';

export class Auth {
  @observable
  isAuth = false;

  @observable
  token = '';
  
  @observable
  refreshToken = '';

  constructor(isAuth, token, refreshToken) {
    this.isAuth = isAuth;
    this.token = token;
    this.refreshToken = refreshToken;
    makeObservable(this);
  }

  @action
  setIsAuth = (value) => {
    this.isAuth = value;
  };

  @action
  setToken = (value) => {
    this.token = value;
  };

  @action
  setRefreshToken = (value) => {
    this.refreshToken = value;
  };

  @action
  setLogin = (token, refreshToken) => {
    this.isAuth = true;
    this.token = value;
    this.refreshToken = value;
  };

  setLogout = () => {
    this.isAuth = false;
    this.token = '';
    this.refreshToken = '';
  };
}
