import React, { Fragment, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useMutation } from '@apollo/react-hooks';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Company from '../../../components/Company'
import ErrorBlock from '../../../components/ErrorBlock';
import NoResultBlock from '../../../components/NoResultBlock';
import Product from '../../../components/Product'

import { TextField, useTheme, Divider } from '../../../react-native-ui';
import { getErrors } from '../../../utils/errors';
import { useSelectedAddress } from '../../../utils/hooks';

import { SEARCH_PRODUCTS_COMPANIES } from '../../../graphql/search';


const Tab = createMaterialTopTabNavigator();

const timeOutLimit = 700;

export default function SearchBlock() {
	const { palette } = useTheme();
	const [actualSearch, setActualSearch]= useState('');
	const { location } = useSelectedAddress();
	let timeOut = null;
	const locationStr = location.join(',');

	useEffect(() => {
		if (actualSearch) handleSearch({ variables: { search: actualSearch } })
	}, [locationStr, actualSearch])

	// MUTATION
	const [handleSearch, { called, loading: loadingSearch, error: searchError, data: { products = [], companies = [] } = {} }] = useMutation(SEARCH_PRODUCTS_COMPANIES, { variables: { location } })

	function handleChangeSearch(searchText) {
		if (timeOut) clearTimeout(timeOut);
		if (!searchText) return setActualSearch('');

		timeOut = setTimeout(()=>{
			//handleSearch({ variables: { search: searchText } })
			setActualSearch(searchText);
		}, timeOutLimit)
	}

	if (searchError) return <ErrorBlock error={getErrors(searchError)} />

	return (
		<View>
			<TextField
				label='Pesquisar'
				style={{ inputContainer: { backgroundColor: palette.background.main } }}
				onChangeText={handleChangeSearch}
			/>

			{loadingSearch && <ActivityIndicator color={palette.primary.main} />}

			{(products.length || companies.length)
				? (
					<View style={{ marginHorizontal: -35 }}>
						<Tab.Navigator
							initialRouteName='SearchProducts'
							sceneContainerStyle={{
								backgroundColor: 'transparent',
								overflow: 'visible',
								margin: 35
							}}
							style={{  }}
							tabBarOptions={{
								activeTintColor: palette.primary.main,
								inactiveTintColor: '#D1C6B1',
								labelStyle: { fontWeight: 'bold', textTransform: 'capitalize', fontSize: 18, },
								style: { elevation: 0, marginHorizontal: 35 },
								tabStyle: { padding: 0 },
								indicatorStyle: { backgroundColor: palette.primary.main, height: 3 }
							}}
						>
							<Tab.Screen name='SearchProducts'  options={{ title: 'Produtos' }}>
								{()=>(
									products.map((product, index) => (
										<Fragment key={product.id}>
											<Product key={product.id} item={product} />
											{Boolean(index+1 < products.length) && <Divider />}
										</Fragment>
									))
								)}
							</Tab.Screen>
							<Tab.Screen name='SearchCompanies' options={{ title: 'Estabelecimentos' }}>
								{()=>(
									companies.map(company => <Company key={company.id} item={company} />)
								)}
							</Tab.Screen>
						</Tab.Navigator>
					</View>
				)
				: (called && !loadingSearch) && <NoResultBlock />
			}
		</View>
	);
}
