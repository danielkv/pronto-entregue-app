import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { Paper, Avatar, Typography, Icon } from '../../react-native-ui';
import ClosedCompanyChip from '../ClosedCompanyChip';
import RatingStars from '../RatingStars';
import { FooterContainer, FooterContent } from './style';

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
					{company?.isOpen === false && <View style={{ marginBottom: 5 }}><ClosedCompanyChip /></View>}
					<Typography style={{ fontSize: 16, fontWeight: 'bold' }}>{company.displayName}</Typography>
					{Boolean(company.rate) && <RatingStars rate={company.rate} size={12} />}

					<>
						<FooterContainer>
							{Boolean(company.deliveryTime) && <FooterContent>
								<Icon name='clock' size={15} color='#818181' />
								<Typography style={{ fontSize: 12, color: '#818181' }}>{`~${company.deliveryTime} min`}</Typography>
							</FooterContent>}
							{Boolean(company.distance) && <FooterContent>
								<Icon name='map-pin' size={15} color='#818181' />
								<Typography style={{ fontSize: 12, color: '#818181' }}>{`${company.distance} km`}</Typography>
							</FooterContent>}
							{Boolean(company.countRatings) && <FooterContent>
								<Icon name='message-square' size={15} color='#818181' />
								<Typography style={{ fontSize: 12, color: '#818181' }}>{`${company.countRatings} avaliações`}</Typography>
							</FooterContent>}
						</FooterContainer>
					</>
				</View>
			</TouchableOpacity>
		</Paper>
	);
}
