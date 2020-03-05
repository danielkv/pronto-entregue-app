import React, { Fragment } from 'react';
import { View } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProductItem from '../../../components/ProductItem';

import { useTheme, Divider, Paper } from '../../../react-native-ui';
const Tab = createMaterialTopTabNavigator();

// import { Container } from './styles';

export default function ProductsBlock({ categories }) {
	const { palette } = useTheme();

	return (
		<Paper>
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
						scrollEnabled: true,
						labelStyle: { fontWeight: 'bold', textTransform: 'capitalize', fontSize: 18, },
						style: { elevation: 0 },
						tabStyle: { padding: 0 },
						indicatorStyle: { backgroundColor: palette.primary.main, height: 3 }
					}}
				>
					{categories.map(category => (
						<Tab.Screen key={category.id} name={`Section_${category.id}`}  options={{ title: category.name }}>
							{()=>(
								category.products.map((product, index) => (
									<Fragment key={product.id}>
										<ProductItem key={product.id} item={product} />
										{Boolean(index+1 < 	category.products.length) && <Divider />}
									</Fragment>
								))
							)}
						</Tab.Screen>
					)
					)}
				</Tab.Navigator>
			</View>
		</Paper>
	)
}
