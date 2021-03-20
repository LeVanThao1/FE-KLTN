import {Auth} from './auth';

export const stores = {
  auth: new Auth(false),
};

export const storeInstance = stores;

export {Auth};
