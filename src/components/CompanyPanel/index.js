import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { Paper, Avatar, Typography } from '../../react-native-ui';
import RatingStars from '../RatingStars';

// import { Container } from './styles';

export default function CompanyPanel({ company }) {
	const navigation = useNavigation();
	const routeState = {
		companyId: company.id,
		companyName: company.displayName,
		companyImage: company.image,
		companyBackground: company.backgroundColor
	}
	
	return (
		<Paper style={{ paddingVertical: 25 }}>
			<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={()=>navigation.push('CompanyScreen', routeState)}>
				<Avatar size={60} image={company.image} alt={company.displayName} />
				<View style={{ marginLeft: 10 }}>
					<Typography style={{ fontSize: 18, fontWeight: 'bold' }}>{company.displayName}</Typography>
					<RatingStars rate={company.rate} size={13} />
				</View>
			</TouchableOpacity>
		</Paper>
	);
}
