/* eslint-disable global-require */
//import React from 'react';

const gateways = {
	money: require('./Money').default,
	delivery: require('./Delivery').default,
	app: require('./PicPay').default
}

export function createGateway({ method, cart, createOrder, afterFinishOrder }) {
	try {
		const gt = gateways[method.type];
		if (!gt) throw new Error('Esse gateway não existe');
		return new gt({ cart, method, createOrder, afterFinishOrder });
	} catch (err) {
		console.error(err);
	}
}

/* export default function Gateway({ step, method, onPress, cart, onFinish }) {
	const { Finish, Option } = gateways[method.type];

	if (step === 'option') return <Option method={method} onPress={onPress} />
	if (step === 'finish') return <Finish method={method} cart={cart} onFinish={onFinish} />
} */