import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, ActivityIndicator, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import * as Permissions from 'expo-permissions';

import BgWelcome from '../../assets/images/bg_welcome.png';
import LogoSymbol from '../../assets/images/logo-vertical-v3.png';
import { useTheme, Paper, Typography, Button } from '../../react-native-ui';
import { initialize } from '../../services/init';
import { useLoggedUserId } from '../../utils/hooks';

export default function LocationAccess() {
	const { palette } = useTheme();
	const [loading, setLoading] = useState(true);
	const loggedUserId = useLoggedUserId();
	const navigation = useNavigation()

	useEffect(()=>{
		init()
	}, [])

	function init() {
		initialize()
			.then(async ({ address, user })=>{
				if (address || user) {
					nextPage();
				} else {
					setLoading(false);
				}
			})
			.catch((err)=>{
				Alert.alert(
					'Ops, Ocorreu um erro!',
					err.message,
					[
						{ text: 'Tentar novamente', onPress: init },
					]
				);
			})
	}

	async function handlePermit() {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status === 'granted') {
			navigation.navigate('PickAddressScreen')
		} else {
			Alert.alert(
				'Hmm... Parece que a permissão não foi concedida',
				'Precisamos ter a permissão de utilizar sua localização para poder te mostrar os estabelecimentos próximos de você.',
				[
					{ text: 'Tentar novamente', onPress: handlePermit },
				]
			);
		}
	}

	
	function nextPage() {
		if (loggedUserId) {
			navigation.navigate('HomeRoutes');
		} else {
			navigation.navigate('AskLoginScreen');
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<ImageBackground style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} resizeMode='cover' source={BgWelcome}>
				{loading
					? (
						<View>
							<Image source={LogoSymbol} resizeMode='contain' style={{ width: 110, marginBottom: 25 }} />
							<ActivityIndicator color={palette.primary.main} size='large' />
						</View>
					)
					: (
						<Paper style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
							<Typography style={{ textAlign: 'center', fontSize: 18, fontWeight: "bold", color: '#333', marginBottom: 10 }}>Seja bem vindo</Typography>
							<Typography style={{ textAlign: 'center', fontSize: 13, color: '#333', marginBottom: 10 }}>
								Para buscar os melhores estabelecimentos para você precisamos ter acesso a sua localização
							</Typography>
							<Button variant='filled' color='primary' onPress={handlePermit}>Permitir</Button>
						</Paper>
					)}
			</ImageBackground>
		</View>
	);
}
