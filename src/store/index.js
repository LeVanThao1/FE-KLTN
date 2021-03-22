import {Auth} from './auth';
import {User} from './user';

export const stores = {
  auth: new Auth(false, '', ''),
  user: new User(undefined),
};

export const storeInstance = stores;

export {Auth};
