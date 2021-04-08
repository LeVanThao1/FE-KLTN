import {Auth} from './auth';
import {Book} from './book';
import {User} from './user';

export const stores = {
  auth: new Auth(false, '', ''),
  user: new User(undefined),
  book: new Book(undefined),
};

export const storeInstance = stores;

export {Auth};
