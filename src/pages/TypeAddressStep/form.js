import React from 'react';
import { View } from 'react-native';

import { useRoute } from '@react-navigation/core';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AddressField from './fields/AddressField';
import CityStateZipcode from './fields/CityStateZipcode';
import StreetNumberField from './fields/StreetNumberField';
import Navigator from './Navigator';

const Tab = createMaterialTopTabNavigator();

export default function AddressForm() {
	const routes = ['nameField', 'streetNumberField', 'districtField', 'complementField', 'referenceField', 'cityStateZipcodeField']
	
	const { state: { index = 0 } = {} } = useRoute();

	return (
		<View style={{ flex: 1 }}>
			<Tab.Navigator
				
				cardStyleInterpolator={(current)=>{console.log(current)}}
				tabBar={()=><View />}
				//swipeEnabled={false}
			>
				<Tab.Screen name='nameField'>
					{(props)=>
						<AddressField
							{...props}
							label='Dê um nome para seu endereço'
							fieldName='name'
							helperText='Ex.: Minha Casa, Sítio do avô, etc'
							description='Esse nome serve apenas para você identificar, ele não será utilizado para auxiliar na entrega'
						/>}
				</Tab.Screen>
			
				<Tab.Screen name='streetNumberField' component={StreetNumberField} />

				<Tab.Screen name='districtField'>
					{(props)=>
						<AddressField
							{...props}
							label='Qual o nome do bairro?'
							fieldName='district'
							helperText='Ex.: Centro, Vila Nova, etc.'
						/>}
				</Tab.Screen>

				<Tab.Screen name='complementField'>
					{(props)=>
						<AddressField
							{...props}
							label='Complemento'
							fieldName='complement'
							helperText='Ex.: Apto 302, fundos da casa, casa verde com janelas brancas.'
							description='Nos diga como podemos encontrar você'
						/>}
				</Tab.Screen>

				<Tab.Screen name='referenceField'>
					{(props)=>
						<AddressField
							{...props}
							label='Ponto de referência'
							fieldName='district'
							helperText='Ex.: Igreja São João, vizinho da casa 54, etc.'
							description='Dê um ponto de referência conhecido. Você pode também informar o número da casa do vizinho'
						/>}
				</Tab.Screen>
					
				<Tab.Screen name='cityStateZipcode' component={CityStateZipcode} />
			</Tab.Navigator>
			<Navigator routes={routes} index={index} />
		</View>
			
	);
}
