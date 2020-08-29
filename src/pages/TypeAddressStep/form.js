import React from 'react';
import { View } from 'react-native';

import { useRoute } from '@react-navigation/core';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AddressField from './fields/AddressField';
import CheckAddress from './fields/CheckAddress';
import Navigator from './Navigator';

const Tab = createMaterialTopTabNavigator();

export default function AddressForm() {
	const routes = ['nameField', 'streetNumberField', 'districtField', 'complementField', 'referenceField', 'cityStateZipcodeField', 'checkAddress']
	
	const { state: { index = 0 } = {} } = useRoute();

	return (
		
		<Tab.Navigator
			cardStyleInterpolator={(current)=>{console.log(current)}}
			tabBar={()=><View />}
			//swipeEnabled={false}
		>
			<Tab.Screen name='nameField'>
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
			</Tab.Screen>

			<Tab.Screen name='streetNumberField'>
				{(props)=>
					<AddressField
						{...props}
						labels={['Digite o nome da rua/avenida', 'E o número']}
						fields={['street', 'number']}
						description='Caso sua casa não tenha número, preencha com "0".'
						currentRoute={index}
						routes={routes}
					/>}
			</Tab.Screen>

			<Tab.Screen name='districtField'>
				{(props)=>
					<AddressField
						{...props}
						labels={['Qual o nome do bairro?']}
						fields={['district']}
						helperText='Ex.: Centro, Vila Nova, etc.'
						currentRoute={index}
						routes={routes}
					/>}
			</Tab.Screen>

			<Tab.Screen name='complementField'>
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
			</Tab.Screen>

			<Tab.Screen name='referenceField'>
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
			</Tab.Screen>
				
			<Tab.Screen name='cityStateZipcodeField'>
				{(props)=>
					<AddressField
						{...props}
						labels={['Digite a cidade', 'Estado', 'CEP']}
						fields={['city', 'state', 'zipcode']}
						description='Para finalizar verifique a cidade, estado e CEP de onde quer receber seu pedido.'
						currentRoute={index}
						routes={routes}
					/>}
			</Tab.Screen>

			<Tab.Screen name='checkAddress' component={CheckAddress} />
		</Tab.Navigator>
	);
	{/* <Navigator routes={routes} index={index} /> */}
}