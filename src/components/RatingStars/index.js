import React from 'react';
import { View } from 'react-native';

import { Icon } from '../../react-native-ui';

function renderStars(rate, size) {
	const stars = [];
	for (let i=1; i<=5; i++) {
		stars.push(<Icon key={i} style={{ root: { margin: 0, marginRight: 2 } }} name='star' color={i > rate ? '#999999': '#D41450'} size={size} />)
	}
	return stars
}

export default function RatingStars({ rate, size=15 }) {
	return (
		<View style={{ flexDirection: 'row', marginTop: 4 }}>{renderStars(rate, size)}</View>
	);
}
