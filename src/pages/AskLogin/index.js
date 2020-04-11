import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, ActivityIndicator, Alert } from 'react-native';


import BgAskLogin from '../../assets/images/bg_login_ask.png';
import LogoSymbol from '../../assets/images/logo-vertical-v3.png';
import { useTheme, Paper, Typography, Button } from '../../react-native-ui';

export default function LocationAccess() {
	const { palette } = useTheme();
	

	return (
		<View style={{ flex: 1 }}>
			<ImageBackground style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} resizeMode='cover' source={BgAskLogin}>
				
				<Image source={LogoSymbol} resizeMode='contain' style={{ width: 80, marginBottom: 25 }} />
				<Paper style={{ marginHorizontal: 10 }}>
					<Typography style={{ textAlign: 'center', fontSize: 18, fontWeight: "bold", color: '#333', marginBottom: 10 }}>Só mais um pouquinho...</Typography>
					<Button variant='filled' color='primary' onPress={()=>{}}>Fazer Login</Button>
					<Button variant='outlined' onPress={()=>{}}>Procurar itens primeiro</Button>
				</Paper>
					
			</ImageBackground>
		</View>
	);
}
