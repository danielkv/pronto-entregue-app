/* eslint-disable global-require */
import React from 'react';

const gateways = {
	money: require('./Money'),
	delivery: require('./Delivery'),
	//app: require('./App')
}

export default function Gateway({ step, method, onPress, cart, onFinish }) {
	const { Finish, Option } = gateways[method.type];

	if (step === 'option') return <Option method={method} onPress={onPress} />
	if (step === 'finish') return <Finish method={method} cart={cart} onFinish={onFinish} />
}