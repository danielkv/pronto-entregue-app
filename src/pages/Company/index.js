import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useQuery } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/core';

import ErrorBlock from '../../components/ErrorBlock';
import RatingStars from '../../components/RatingStars';

import { Paper, Typography, useTheme, Icon } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import { useSelectedAddress } from '../../utils/hooks';
import ProductsBlock from './ProductsBlock';
import RatingBlock from './RatingBlock';
import { FooterContainer, FooterContent } from './styles';

import { LOAD_COMPANY } from '../../graphql/companies';

export default function Company() {
	const { params: { companyId, companyName, companyImage, companyBackground } } = useRoute();
	const { location } = useSelectedAddress();
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
				<Typography style={{ fontSize: 30, color: palette.background.dark, fontWeight: 'bold' }}>{companyName}</Typography>
				{loadingCompany
					? <ActivityIndicator color={palette.primary.main} />
					: (
						<>
							<RatingStars rate={company.rate} />
							<FooterContainer>
								<FooterContent>
									<Icon name='clock' size={15} color='#818181' />
									<Typography style={{ fontSize: 12, color: '#818181' }}>{`~${company.deliveryTime} min`}</Typography>
								</FooterContent>
								<FooterContent>
									<Icon name='map-pin' size={15} color='#818181' />
									<Typography style={{ fontSize: 12, color: '#818181' }}>{`${company.distance} km`}</Typography>
								</FooterContent>
								<FooterContent>
									<Icon name='message-square' size={15} color='#818181' />
									<Typography style={{ fontSize: 12, color: '#818181' }}>{`${company.countRatings} avaliações`}</Typography>
								</FooterContent>
							</FooterContainer>
						</>
					)}
			</Paper>

			{Boolean(!loadingCompany && company) && <ProductsBlock companyId={company.id} />}
			
			{Boolean(!loadingCompany && company) && <RatingBlock companyId={company.id} />}
		</ScrollView>
	);
}