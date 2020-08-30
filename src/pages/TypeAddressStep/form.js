import React from 'react';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import { useRoute } from '@react-navigation/core';
//import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { Typography, useTheme } from '../../react-native-ui';
import AddressField from './fields/AddressField';
import CheckAddress from './fields/CheckAddress';
import Navigator from './Navigator';

const Stack = createStackNavigator();

export default function AddressForm({ redirect }) {
	const routes = ['nameField', 'streetNumberField', 'districtField', 'complementField', 'referenceField', 'cityStateZipcodeField', 'checkAddress'];
	const { palette } = useTheme();
	const insets = useSafeArea();
	
	const { state: { index = 0 } = {} } = useRoute();

	function handleHeaderTitle(info) {
		return (
			<View>
				<Typography style={{ color: info.tintColor, textAlign: 'center', fontFamily: 'Roboto-Bold', fontSize: 18 }}>
					{info.children}
				</Typography>
				<Navigator routes={routes} index={index} />
			</View>
		)
	}

	return (
		<Stack.Navigator
			headerMode='float'
			tabBar={()=><View />}
			screenOptions={{
				headerTintColor: '#fff',
				headerStyle: { height: 70 + insets.top, backgroundColor: palette.primary.main },
				headerTitle: handleHeaderTitle,
				headerTitleAlign: 'center',
				headerBackTitleVisible: false,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
			//swipeEnabled={false}
		>
			<Stack.Screen name='nameField' options={{ title: 'Nome' }}>
				{(props)=>
					<AddressField
						{...props}
						labels={['Dê um nome para seu endereço']}
						fields={['name']}
						helperText='Ex.: Minha Casa, Sítio do avô, etc'
						description='Esse nome serve apenas para você identificar, ele não será utilizado para auxiliar na entrega'
						currentRoute={index}
						routes={routes}
					/>}
			</Stack.Screen>

			<Stack.Screen name='streetNumberField' options={{ title: 'Rua / nº' }}>
				{(props)=>
					<AddressField
						{...props}
						labels={['Digite o nome da rua/avenida', 'E o número']}
						fields={['street', 'number']}
						description='Caso sua casa não tenha número, preencha com "0".'
						currentRoute={index}
						routes={routes}
					/>}
			</Stack.Screen>

			<Stack.Screen name='districtField' options={{ title: 'Bairro' }}>
				{(props)=>
					<AddressField
						{...props}
						labels={['Qual o nome do bairro?']}
						fields={['district']}
						helperText='Ex.: Centro, Vila Nova, etc.'
						currentRoute={index}
						routes={routes}
					/>}
			</Stack.Screen>

			<Stack.Screen name='complementField' options={{ title: 'Complemento' }}>
				{(props)=>
					<AddressField
						{...props}
						labels={['Complemento']}
						fields={['complement']}
						helperText='Ex.: Apto 302, fundos da casa, casa verde com janelas brancas.'
						description='Nos diga como podemos encontrar você'
						currentRoute={index}
						routes={routes}
					/>}
			</Stack.Screen>

			<Stack.Screen name='referenceField' options={{ title: 'Ponto de referência' }}>
				{(props)=>
					<AddressField
						{...props}
						labels={['Ponto de referência']}
						fields={['reference']}
						helperText='Ex.: Igreja São João, vizinho da casa 54, etc.'
						description='Dê um ponto de referência conhecido. Você pode também informar o número da casa do vizinho'
						currentRoute={index}
						routes={routes}
					/>}
			</Stack.Screen>
				
			<Stack.Screen name='cityStateZipcodeField' options={{ title: 'Cidade / Estado' }}>
				{(props)=>
					<AddressField
						{...props}
						labels={['Digite a cidade', 'Estado', 'CEP']}
						fields={['city', 'state', 'zipcode']}
						description='Para finalizar verifique a cidade, estado e CEP de onde quer receber seu pedido.'
						currentRoute={index}
						routes={routes}
					/>}
			</Stack.Screen>

			<Stack.Screen  name='checkAddress' options={{ title: 'Verificar dados' }}>
				{props => <CheckAddress {...props} redirect={redirect} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
}