import React from 'react';
import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { Typography, Icon } from '../../react-native-ui';
import ClosedCompanyChip from '../ClosedCompanyChip';
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
					height: 140,
					opacity
				}}
				resizeMode='contain'
			/>
			<ContentContainer style={{ opacity }}>
				{!company.isOpen && <ClosedCompanyChip />}
				<Typography style={{ fontSize: 18, fontWeight: 'bold' }}>{company.displayName}</Typography>
				<RatingStars rate={company.rate} size={14} />
				<FooterContainer>
					{Boolean(company.deliveryTime) && <FooterContent>
						<Icon name='clock' size={15} color='#818181' />
						<Typography style={{ fontSize: 12, color: '#818181' }}>{`~${company.deliveryTime} min`}</Typography>
					</FooterContent>}
					<FooterContent>
						<Icon name='map-pin' size={15} color='#818181' />
						<Typography style={{ fontSize: 12, color: '#818181' }}>{`${company.distance} km`}</Typography>
					</FooterContent>
				</FooterContainer>
			</ContentContainer>
		</Container>
	);
}
