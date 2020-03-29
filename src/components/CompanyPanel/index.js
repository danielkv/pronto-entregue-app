import React from 'react';
import { View } from 'react-native';

import { Paper, Avatar, Typography } from '../../react-native-ui';
import RatingStars from '../RatingStars';

// import { Container } from './styles';

export default function CompanyPanel({ company }) {
	return (
		<Paper style={{ paddingVertical: 25, flexDirection: 'row', alignItems: 'center' }}>
			<Avatar size={60} source={{ uri: company.image }} alt={company.displayName} />
			<View style={{ marginLeft: 10 }}>
				<Typography style={{ fontSize: 18, fontWeight: 'bold' }}>{company.displayName}</Typography>
				<RatingStars rate={company.rate} size={13} />
			</View>
		</Paper>
	);
}
