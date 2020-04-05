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
		<Paper style={{ paddingVertical: 20 }}>
			<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={()=>navigation.push('HomeRoutes', { screen: 'CompanyScreen', params: routeState })}>
				<Avatar size={50} image={company.image} alt={company.displayName} />
				<View style={{ marginLeft: 10 }}>
					<Typography style={{ fontSize: 16, fontWeight: 'bold' }}>{company.displayName}</Typography>
					<RatingStars rate={company.rate} size={12} />
				</View>
			</TouchableOpacity>
		</Paper>
	);
}
