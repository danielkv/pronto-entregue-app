import React from 'react';

import Gateway from '../gateway';
import RenderPayment from './payment';


export default class MoneyOnDelivery extends Gateway {
	constructor () {
		super();
		this.setTitle('Em dinheiro na entrega');
		this.setType('MoneyOnDelivery');
	}

	renderPayment = (props) => {
		return (
			<RenderPayment gateway={this} {...props} />
		);
	}
}