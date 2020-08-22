import React from 'react';
import { View, Image } from 'react-native';


import { useNavigation } from '@react-navigation/core';

import LogoSymbol from '../../assets/images/logo-vertical-v3.png';
import { Paper, Typography, Button } from '../../react-native-ui';

export default function SplashLogin() {
	const navigation = useNavigation();
	function handleContinueLogin() {
		navigation.navigate('AuthenticationRoutes');
	}
	function handleContinueLook() {
		navigation.dangerouslyGetParent().replace('HomeRoutes');
	}
	
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			
				
			<Image source={LogoSymbol} resizeMode='contain' style={{ width: 80, marginBottom: 25 }} />
			<Paper
				style={{
					marginHorizontal: 10,
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3.84,

					elevation: 5,
				}}>
				<Typography style={{ textAlign: 'center', fontSize: 18, fontFamily: 'Roboto-Bold', color: '#333', marginBottom: 10 }}>Só mais um pouquinho...</Typography>
				<Button variant='filled' color='primary' onPress={handleContinueLogin}>Fazer Login</Button>
				<Button variant='outlined' onPress={handleContinueLook}>Procurar itens primeiro</Button>
			</Paper>
					
			
		</View>
	);
}
