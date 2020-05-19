import React, { Fragment, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';
import ProductItem from '../../components/ProductItem';

import { useLoggedUserId } from '../../controller/hooks';
import { Paper, Typography, Divider, useTheme } from '../../react-native-ui';
import { Chip } from '../../react-native-ui';
import { BRL } from '../../utils/currency';
import { getErrorMessage } from '../../utils/errors';

import { GET_USER_CREDITS } from '../../graphql/users';
import moment from 'moment';

// import { Container } from './styles';

export default function CreditHistory() {
	const { palette } = useTheme();
	const [refreshing, setRefreshing] = useState(false);
	const loggedUserId = useLoggedUserId();
	const { data: { user: { creditBalance = 0, creditHistory = [] } = {} } = {}, loading: loadingCredit, error: creditError, refetch } = useQuery(GET_USER_CREDITS, { variables: { id: loggedUserId } });

	function onRefresh() {
		setRefreshing(true);
		refetch().finally(()=>setRefreshing(false))
	}

	if (creditError) return <ErrorBlock error={getErrorMessage(creditError)} />;

	return (
		<ScrollView
			refreshControl={<RefreshControl tintColor={palette.primary.main} colors={[palette.primary.main]} refreshing={refreshing} onRefresh={onRefresh} />}
		>
			<Paper>
				{loadingCredit
					? <LoadingBlock />
					: (
						<>
							<Chip label={`Valor disponível: ${BRL(creditBalance).format()}`} />
							<View style={{ marginTop: 25 }}>
								{!creditHistory.length
									? <Typography variant='subtitle' style={{ fontSize: 13 }}>Você não tem nenhuma movimentação em seus créditos</Typography>
									: creditHistory.map((row, index) => {
										const valueColor = row.value < 0 ? '#C9272D' : '#009245';
										const date = moment(row.createdAt).format('DD/MM/YY H:m')
										return (
											<Fragment key={row.id}>
												{index > 0 && <Divider />}
												<View>
													<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
														<Typography style={{ fontSize: 13, color: '#999' }}>{date}</Typography>
														<Typography style={{ fontSize: 13, color: '#999' }}>{`#${row.id}`}</Typography>
													</View>
													<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
														<Typography style={{ fontSize: 16, color: '#333' }}>{row.history}</Typography>
														<Typography style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: valueColor }}>{BRL(row.value).format()}</Typography>
													</View>
												</View>
											</Fragment>
										)})
								}
							</View>
						</>
					)}
			</Paper>
		</ScrollView>
	);
}
