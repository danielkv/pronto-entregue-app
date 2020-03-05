import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useQuery } from '@apollo/react-hooks';
import { useNavigation, useRoute } from '@react-navigation/core';

import ErrorBlock from '../../components/ErrorBlock';

import { Paper, Typography, useTheme, Icon } from '../../react-native-ui';
import { getErrors } from '../../utils/errors';
import { useSelectedAddress } from '../../utils/hooks';
import ProductsBlock from './ProductsBlock';
import RatingBlock from './RatingBlock';
import { Stars,	FooterContainer, FooterContent } from './styles';

import { LOAD_COMPANY } from '../../graphql/companies';

export default function Company() {
	const { params: { companyId, companyName, companyImage, companyBackground } } = useRoute();
	const navigation = useNavigation();
	const { location } = useSelectedAddress();
	const { palette } = useTheme();

	const { data: { company = null } = {}, loading: loadingCompany, error: companyError } = useQuery(LOAD_COMPANY, { variables: { id: companyId, location } });

	useEffect(()=>{
		navigation.setParams({ headerTransparent: true })
	}, [])

	function renderStars(rate) {
		const stars = [];
		for (let i=1; i<=5; i++) {
			stars.push(<Icon key={i} style={{ root: { margin: 0, marginRight: 2 } }} name='star' color={i > rate ? '#999999': '#D41450'} size={15} />)
		}
		return stars
	}

	if (companyError) return <ErrorBlock error={getErrors(companyError)} />

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
							<Stars>{renderStars(company.rate)}</Stars>
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