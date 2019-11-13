import { merge } from 'lodash';

import branches from './branches';
import cartItem from './cart';


export default merge(branches, cartItem);