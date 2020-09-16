import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useQuery } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/core';
import moment from 'moment'

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
import Header from '../../components/NewHeader';

export default function Company() {
	const { params: { companyId, companyName, companyImage, companyBackground } } = useRoute();
	const { location = null } = useSelectedAddress();
	const { palette } = useTheme();

	const { data: { company = null } = {}, loading: loadingCompany, error: companyError } = useQuery(LOAD_COMPANY, { variables: { id: companyId, location } });

	const isOpen = company?.nextClose ? moment(company.nextClose).isSameOrAfter() : false

	if (companyError) return <ErrorBlock error={getErrorMessage(companyError)} />

	return (
		<View>
			<Header variant='transparent' />

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
					<View style={{ flexDirection: 'row', marginBottom: 5 }}>
						{Boolean(company && !isOpen) && <ClosedCompanyChip allowBuyClosed={company?.allowBuyClosed} />}
						{!(company?.delivery) && company?.pickup && <OnlyPickUp text='Apenas Retirada no local' />}
					</View>
					<Typography style={{ fontSize: 24, color: palette.background.dark, fontFamily: 'Roboto-Bold' }}>{companyName}</Typography>
					{Boolean(!isOpen && company?.nextOpen) && <Typography style={{ fontSize: 12, color: '#818181' }}>{`Abre ${CompanyController.renderNextHour(company.nextOpen)}`}</Typography>}
					{Boolean(isOpen && company?.nextClose) && <Typography style={{ fontSize: 12, color: '#818181' }}>{`Até ${CompanyController.renderNextHour(company.nextClose)}`}</Typography>}
					{loadingCompany
						? <ActivityIndicator color={palette.primary.main} />
						: (
							<>
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

					{Boolean(company?.allowBuyClosed) && <View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-start',
							marginTop: 15,
							backgroundColor: '#f0f0f0',
							borderRadius: 8,
							padding: 13,
						}}>
						<Icon name='info' color='#333' style={{ root: { margin: 0, marginRight: 10 } }} />
						<View style={{ flex: 1 }}>
							<Typography style={{ fontSize: 12, color: '#333' }}>
								{`Este estabelecimento aceita pedidos enquanto está fechado. O prazo de entrega valerá a partir do horário de abertura.`}
							</Typography>
							<Typography style={{ fontSize: 12, fontFamily: 'Roboto-Bold', color: '#333', marginTop: 5 }}>{`O estabelecimento abre ${moment(company.nextOpen).fromNow()}`}</Typography>
						</View>
					</View>}
				</Paper>

				{Boolean(!loadingCompany && company) && <ProductsBlock companyId={company.id} />}

				{/* Boolean(!loadingCompany && company) && <RatingBlock companyId={company.id} /> */}
			</ScrollView>
		</View>
	);
}