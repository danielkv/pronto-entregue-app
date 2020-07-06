import React from 'react';
import { View, Image } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { Typography, Icon } from '../../react-native-ui';
import { formatDistance } from '../../utils';
import ClosedCompanyChip from '../ClosedCompanyChip';
import OnlyPickUp from '../OnlyPickUp';
import RatingStars from '../RatingStars';
import { Container, ContentContainer, FooterContainer, FooterContent } from './styles';

export default function CompanyItem({ item: company }) {
	const navigation = useNavigation();

	const opacity = company.isOpen ? 1 : .5;

	return (
		<Container onPress={()=> navigation.navigate('CompanyScreen', { companyId: company.id, companyName: company.displayName, companyImage: company.image, companyBackground: company.backgroundColor })}>
			<Image
				source={{ uri: company.image }}
				style={{
					width: 110,
					height: 120,
					opacity
				}}
				resizeMode='cover'
			/>
			<ContentContainer style={{ opacity }}>
				<Typography style={{ fontSize: 18, fontFamily: 'Roboto-Bold' }}>{company.displayName}</Typography>
				<View style={{ flexDirection: 'row' }}>
					{!company.isOpen && <ClosedCompanyChip />}
					{!company.delivery && company.pickup && <OnlyPickUp />}
				</View>
				<RatingStars rate={company.rate} size={14} />
				<FooterContainer>
					{Boolean(company.deliveryTime) && <FooterContent>
						<Icon name='clock' size={15} color='#818181' />
						<Typography style={{ fontSize: 12, color: '#818181' }}>{`~${company.deliveryTime} min`}</Typography>
					</FooterContent>}
					<FooterContent>
						<Icon name='map-pin' size={15} color='#818181' />
						<Typography style={{ fontSize: 12, color: '#818181' }}>{formatDistance(company.distance)}</Typography>
					</FooterContent>
				</FooterContainer>
			</ContentContainer>
		</Container>
	);
}
