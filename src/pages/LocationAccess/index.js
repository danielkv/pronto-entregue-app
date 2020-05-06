import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, ActivityIndicator, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import * as Updates from 'expo-updates';

import BgWelcome from '../../assets/images/bg_welcome.jpg';
import LogoSymbol from '../../assets/images/logo-vertical-v3.png';
import { useTheme, Paper, Typography, Button } from '../../react-native-ui';
import { initialize, logUserOut, resetAddress } from '../../services/init';
import { getErrorMessage } from '../../utils/errors';

export default function LocationAccess() {
	const { palette } = useTheme();
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	useEffect(()=>{
		init()
	}, [])

	function init() {
		// Setup listener for updates
		setupUpdates()

		// load saved user and address
		initialize()
			.then(async ({ address, user }) => {
				if (address) {
					nextPage(user);
				} else {
					setLoading(false);
				}
			})
			.catch((err)=>{
				Alert.alert(
					'Ops, Ocorreu um erro!',
					getErrorMessage(err.message),
					[
						{ text: 'Tentar novamente', onPress: init },
						{ text: 'Cancelar', onPress: ()=>{ logUserOut(); resetAddress(); setLoading(false); } }
					]
				);
			})
	}

	function setupUpdates() {
		Updates.addListener(({ type })=>{
			if (type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
				Alert.alert(
					'Há uma nova versão do app disponível',
					'Deseja reiniciar agora?',
					[
						{ text: 'Sim (Isso irá limpar sua cesta)', onPress: ()=>Updates.reloadAsync() },
						{ text: 'Não' }
					]
				)
			}
		})
	}

	function pickLocation() {
		navigation.dangerouslyGetParent().replace('SelectAddressRoutes', { screen: 'PickLocationScreen', params: { pickUserLocation: true } })
	}

	function nextPage(user=null) {
		if (user)
			navigation.dangerouslyGetParent().replace('HomeRoutes')
		else
			navigation.replace('AskLoginScreen');
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
						<Paper
							style={{
								position: 'absolute',
								bottom: 10,
								left: 10,
								right: 10,
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
							<Typography style={{ textAlign: 'center', fontSize: 18, fontWeight: "bold", color: '#333', marginBottom: 10 }}>Seja bem vindo</Typography>
							<Typography style={{ textAlign: 'center', fontSize: 13, color: '#333', marginBottom: 10 }}>
								Para encontrar os melhores estabelecimentos para você precisamos que você nos mostre onde você deseja receber seu pedido
							</Typography>
							<Button variant='filled' color='primary' onPress={pickLocation}>Ok, vamos lá!</Button>
						</Paper>
					)}
			</ImageBackground>
		</View>
	);
}
