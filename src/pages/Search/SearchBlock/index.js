import React, { Fragment, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useMutation } from '@apollo/react-hooks';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CompanyItem from '../../../components/CompanyItem'
import ErrorBlock from '../../../components/ErrorBlock';
import NoResultBlock from '../../../components/NoResultBlock';
import ProductItem from '../../../components/ProductItem'

import { useSelectedAddress } from '../../../controller/hooks';
import { TextField, useTheme, Divider } from '../../../react-native-ui';
import { getErrorMessage } from '../../../utils/errors';

import { SEARCH_PRODUCTS_COMPANIES } from '../../../graphql/search';


const Tab = createMaterialTopTabNavigator();

const timeOutLimit = 600;

export default function SearchBlock() {
	const { palette } = useTheme();
	const [actualSearch, setActualSearch]= useState('');
	const { location = null } = useSelectedAddress();
	let timeOut = null;
	const locationStr = location.join(',');

	// MUTATION
	const [handleSearch, { called, loading, error: searchError, data: { products = [], companies = [] } = {} }] = useMutation(SEARCH_PRODUCTS_COMPANIES, { variables: { location }, fetchPolicy: 'no-cache' })

	useEffect(() => {
		if (actualSearch) handleSearch({ variables: { search: actualSearch.trim() } })
	}, [locationStr, actualSearch])

	function handleChangeSearch(searchText) {
		if (timeOut) clearTimeout(timeOut);
		if (!searchText) return setActualSearch('');

		timeOut = setTimeout(()=>{
			setActualSearch(searchText);
		}, timeOutLimit)
	}

	if (searchError) return <ErrorBlock error={getErrorMessage(searchError)} />

	return (
		<View>
			<TextField
				autoFocus
				label='Busque estabelecimentos e itens'
				style={{ inputContainer: { backgroundColor: palette.background.main } }}
				onChangeText={handleChangeSearch}
			/>

			{loading && <View style={{ marginTop: 20 }}>
				<ActivityIndicator color={palette.primary.main} />
			</View>}

			{(products.length || companies.length)
				? (
					<View style={{ marginTop: 20, marginHorizontal: -35 }}>
						<Tab.Navigator
							initialRouteName='SearchCompanies'
							sceneContainerStyle={{
								backgroundColor: 'transparent',
								overflow: 'visible',
								margin: 35
							}}
							style={{  }}
							tabBarOptions={{
								activeTintColor: palette.primary.main,
								inactiveTintColor: '#D1C6B1',
								labelStyle: { textTransform: 'capitalize', fontSize: 16, },
								style: { elevation: 0, marginHorizontal: 35 },
								tabStyle: { padding: 0 },
								indicatorStyle: { backgroundColor: palette.primary.main, height: 3 }
							}}
						>
							{Boolean(companies.length) && <Tab.Screen name='SearchCompanies' options={{ title: 'Estabelecimentos' }}>
								{()=>(
									companies.map(company => <CompanyItem key={company.id} item={company} />)
								)}
							</Tab.Screen>}
							{Boolean(products.length) && <Tab.Screen name='SearchProducts'  options={{ title: 'Produtos' }}>
								{()=>(
									products.map((product, index) => (
										<Fragment key={product.id}>
											<ProductItem key={product.id} item={product} />
											{Boolean(index+1 < products.length) && <Divider />}
										</Fragment>
									))
								)}
							</Tab.Screen>}
						</Tab.Navigator>
					</View>
				)
				: (called && !loading) && <NoResultBlock />
			}
		</View>
	);
}
