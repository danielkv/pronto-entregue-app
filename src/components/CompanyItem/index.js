import React from 'react';
import { View, Image } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import moment from 'moment';

import CompanyController from '../../controller/company';
import { Typography, Icon } from '../../react-native-ui';
import { formatDistance } from '../../utils';
import ClosedCompanyChip from '../ClosedCompanyChip';
import OnlyPickUp from '../OnlyPickUp';
import RatingStars from '../RatingStars';
import { Container, ContentContainer, FooterContainer, FooterContent } from './styles';

export default function CompanyItem({ item: company }) {
	const navigation = useNavigation();

	const isOpen = company.nextClose ? moment(company.nextClose).isSameOrAfter() : false
	
	const opacity = !isOpen && !company.allowBuyClosed ? .5 : 1;

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
				<View style={{ flexDirection: 'row', marginBottom: 5 }}>
					{!isOpen && <ClosedCompanyChip allowBuyClosed={company?.allowBuyClosed} />}
					{!company.delivery && company.pickup && <OnlyPickUp />}
				</View>
				<Typography style={{ fontSize: 16, fontFamily: 'Roboto-Bold' }}>{company.displayName}</Typography>

				{Boolean(!isOpen && company?.nextOpen) && <Typography style={{ fontSize: 12, color: '#818181' }}>{`Abre ${CompanyController.renderNextHour(company.nextOpen)}`}</Typography>}
				{Boolean(isOpen && company?.nextClose) && <Typography style={{ fontSize: 12, color: '#818181' }}>{`Até ${CompanyController.renderNextHour(company.nextClose)}`}</Typography>}
				
				<RatingStars rate={company.rate} size={14} />
				<FooterContainer>
					{Boolean(company?.configs?.deliveryTime) && <FooterContent>
						<Icon name='clock' size={15} color='#818181' />
						<Typography style={{ fontSize: 12, color: '#818181' }}>{CompanyController.renderDeliveryTime(company.configs.deliveryTime)}</Typography>
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
