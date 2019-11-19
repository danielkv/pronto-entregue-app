/* eslint-disable global-require */
import React from 'react';

const gateways = {
	Money: require('./Money'),
	CreditDebit: require('./CreditDebit')
}

export default function Gateway({ step, name, onPress, cart, onFinish }) {
	const { Finish, Option } = gateways[name];

	if (step === 'option') return <Option onPress={onPress} />
	if (step === 'finish') return <Finish cart={cart} onFinish={onFinish} />
}