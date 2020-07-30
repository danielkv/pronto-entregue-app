import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useQuery } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/core';

import ClosedCompanyChip from '../../components/ClosedCompanyChip';
import ErrorBlock from '../../components/ErrorBlock';
import OnlyPickUp from '../../components/OnlyPickUp';
import RatingStars from '../../components/RatingStars';

import CompanyController from '../../controller/company';
import { useSelectedAddress } from '../../controller/hooks';
import { Paper, Typography, useTheme, Icon } from '../../react-native-ui';
import { formatDistance } from '../../utils';
import { getErrorMessage } from '../../utils/errors';
import ProductsBlock from './ProductsBlock';
import RatingBlock from './RatingBlock';
import { FooterContainer, FooterContent } from './styles';

import { LOAD_COMPANY } from '../../graphql/companies';

export default function Company() {
	const { params: { companyId, companyName, companyImage, companyBackground } } = useRoute();
	const { location = null } = useSelectedAddress();
	const { palette } = useTheme();

	const { data: { company = null } = {}, loading: loadingCompany, error: companyError } = useQuery(LOAD_COMPANY, { variables: { id: companyId, location } });

	if (companyError) return <ErrorBlock error={getErrorMessage(companyError)} />

	return (
		<ScrollView>
			<View
				style={{
					height: 215,
					backgroundColor: companyBackground,
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: -45,
				}}
			>
				<Image source={{ uri: companyImage }} style={{ width: 160, height: 160 }} resizeMode='contain' />
			</View>
			<Paper>
				<Typography style={{ fontSize: 28, color: palette.background.dark, fontFamily: 'Roboto-Bold' }}>{companyName}</Typography>
				{loadingCompany
					? <ActivityIndicator color={palette.primary.main} />
					: (
						<>
							<View style={{ flexDirection: 'row', marginBottom: 5 }}>
								{!company.isOpen && <ClosedCompanyChip />}
								{!company.delivery && company.pickup && <OnlyPickUp text='Apenas Retirada no local' />}
							</View>
							<RatingStars rate={company.rate} />
							<FooterContainer>
								{Boolean(company?.configs?.deliveryTime) && <FooterContent>
									<Icon name='clock' size={15} color='#818181' />
									<Typography style={{ fontSize: 12, color: '#818181' }}>{CompanyController.renderDeliveryTime(company.configs.deliveryTime)}</Typography>
								</FooterContent>}
								<FooterContent>
									<Icon name='map-pin' size={15} color='#818181' />
									<Typography style={{ fontSize: 12, color: '#818181' }}>{formatDistance(company.distance)}</Typography>
								</FooterContent>
								{Boolean(company.countRatings) && <FooterContent>
									<Icon name='message-square' size={15} color='#818181' />
									<Typography style={{ fontSize: 12, color: '#818181' }}>{`${company.countRatings} avaliações`}</Typography>
								</FooterContent>}
							</FooterContainer>
						</>
					)}
			</Paper>

			{Boolean(!loadingCompany && company) && <ProductsBlock companyId={company.id} />}
			
			{Boolean(!loadingCompany && company) && <RatingBlock companyId={company.id} />}
		</ScrollView>
	);
}