import {Auth} from './auth';
import {Book} from './book';
import {Category} from './category';
import {User} from './user';
import {Shop} from './shop';
export const stores = {
  auth: new Auth(false, '', ''),
  user: new User(undefined, undefined, undefined, []),
  book: new Book(undefined),
  category: new Category(undefined),
  shop: new Shop(undefined, undefined),
};

export const storeInstance = stores;

export {Auth};
