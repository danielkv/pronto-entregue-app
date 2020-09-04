import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import moment from 'moment';

import CompanyController from '../../controller/company';
import { Paper, Typography, Icon } from '../../react-native-ui';
import { formatDistance } from '../../utils';
import ClosedCompanyChip from '../ClosedCompanyChip';
import OnlyPickUp from '../OnlyPickUp';
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

	const isOpen = company?.nextClose ? moment(company.nextClose).isSameOrAfter() : company.isOpen;

	return (
		<Paper style={{ paddingVertical: 20 }}>
			<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={()=>navigation.push('CompanyScreen', routeState)}>
				<Image
					source={{ uri: company.image }}
					style={{
						width: 55,
						height: 55,
						borderRadius: 30,
						resizeMode: 'cover'
					}}
				/>
				
				<View style={{ marginLeft: 10 }}>
					<View style={{ flexDirection: 'row', marginBottom: 5 }}>
						{Boolean(company && !isOpen) && <ClosedCompanyChip allowBuyClosed={company?.allowBuyClosed} />}
						{Boolean(!company.delivery && company?.pickup) && <OnlyPickUp />}
					</View>
					<Typography style={{ fontSize: 16, fontFamily: 'Roboto-Bold' }}>{company.displayName}</Typography>

					{Boolean(!isOpen && company?.nextOpen) && <Typography style={{ fontSize: 12, color: '#818181' }}>{`Abre ${CompanyController.renderNextHour(company.nextOpen)}`}</Typography>}
					{Boolean(isOpen && company?.nextClose) && <Typography style={{ fontSize: 12, color: '#818181' }}>{`Até ${CompanyController.renderNextHour(company.nextClose)}`}</Typography>}

					{Boolean(company.rate) && <RatingStars rate={company.rate} size={12} />}
					<FooterContainer>
						{Boolean(company?.configs?.deliveryTime) && <FooterContent>
							<Icon name='clock' size={15} color='#818181' />
							<Typography style={{ fontSize: 12, color: '#818181' }}>{CompanyController.renderDeliveryTime(company.configs.deliveryTime)}</Typography>
						</FooterContent>}
						{Boolean(company.distance) && <FooterContent>
							<Icon name='map-pin' size={15} color='#818181' />
							<Typography style={{ fontSize: 12, color: '#818181' }}>{formatDistance(company.distance)}</Typography>
						</FooterContent>}
						{Boolean(company.countRatings) && <FooterContent>
							<Icon name='message-square' size={15} color='#818181' />
							<Typography style={{ fontSize: 12, color: '#818181' }}>{`${company.countRatings} avaliações`}</Typography>
						</FooterContent>}
					</FooterContainer>
				</View>
			</TouchableOpacity>
		</Paper>
	);
}
