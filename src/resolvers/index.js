import { merge } from 'lodash';

import address from './address';
import cartItem from './cart';


export default merge(cartItem, address);