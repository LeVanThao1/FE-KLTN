import {Auth} from './auth';
import {Book} from './book';
import {Category} from './category';
import {User} from './user';
import {Shop} from './shop';
import {Notification} from  './notification';

export const stores = {
  auth: new Auth(false, '', ''),
  user: new User(undefined, undefined),
  book: new Book(undefined),
  category: new Category(undefined),
  shop: new Shop(undefined, undefined),
  notification: new Notification([], [],[])
};

export const storeInstance = stores;

export {Auth};
