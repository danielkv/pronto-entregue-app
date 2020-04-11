import React from 'react';
import { View, ImageBackground, Image } from 'react-native';


import { useNavigation } from '@react-navigation/core';

import BgAskLogin from '../../assets/images/bg_login_ask.png';
import LogoSymbol from '../../assets/images/logo-vertical-v3.png';
import { Paper, Typography, Button } from '../../react-native-ui';

export default function LocationAccess() {
	const navigation = useNavigation();
	function handleContinueLogin() {
		navigation.navigate('AuthenticationRoutes');
	}
	function handleContinueLook() {
		navigation.dangerouslyGetParent().replace('HomeRoutes');
	}
	

	return (
		<View style={{ flex: 1 }}>
			<ImageBackground style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} resizeMode='cover' source={BgAskLogin}>
				
				<Image source={LogoSymbol} resizeMode='contain' style={{ width: 80, marginBottom: 25 }} />
				<Paper style={{ marginHorizontal: 10 }}>
					<Typography style={{ textAlign: 'center', fontSize: 18, fontWeight: "bold", color: '#333', marginBottom: 10 }}>Só mais um pouquinho...</Typography>
					<Button variant='filled' color='primary' onPress={handleContinueLogin}>Fazer Login</Button>
					<Button variant='outlined' onPress={handleContinueLook}>Procurar itens primeiro</Button>
				</Paper>
					
			</ImageBackground>
		</View>
	);
}
