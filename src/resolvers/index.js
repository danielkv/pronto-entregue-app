import { merge } from 'lodash';

import address from './address';
import cartItem from './cart';
import product from './product';


export default merge(cartItem, address, product);