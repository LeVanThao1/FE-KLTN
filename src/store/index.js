import {Auth} from './auth';
import {Book} from './book';
import {Category} from './category';
import {User} from './user';
import {Shop} from './shop';
import {Notification} from './notification';
import {Order} from './order';
import {Comment} from './comment';

export const stores = {
  auth: new Auth(false, '', ''),
  user: new User(undefined, undefined, undefined, [], []),
  book: new Book(undefined, undefined, '', {}),
  category: new Category(undefined, 'all', {limit: 20, page: 1}),
  shop: new Shop(undefined, undefined),
  notification: new Notification([], [], []),
  order: new Order(undefined),
  comment: new Comment(undefined, undefined),
};

export const storeInstance = stores;

export {Auth};
