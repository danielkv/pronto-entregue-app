import React, { useEffect } from 'react';
import { View, ImageBackground, Image, ActivityIndicator, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import * as Updates from 'expo-updates';

import BgWelcome from '../../assets/images/bg_welcome.jpg';
import LogoSymbol from '../../assets/images/logo-vertical-v3.png';
import getUserLastOrderAddress from '../../helpers/address/getUserClosestAddress';
import resetAddress from '../../helpers/address/resetAddress';
import isUserLoggedIn from '../../helpers/auth/isUserLoggedIn';
import logUserIn from '../../helpers/auth/logUserIn';
import logUserOut from '../../helpers/auth/logUserOut';
import { useTheme } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';

export default function LocationAccess() {
	const { palette } = useTheme();
	const navigation = useNavigation();

	useEffect(()=>{
		init()
	}, [])

	function init() {
		isUserLoggedIn()
			.then((data) => {
				if (!data?.user) navigation.replace('HomeRoutes', { screen: 'SplashLoginScreen' });

				const { user, token } = data;

				logUserIn(user, token);
				return getUserLastOrderAddress(user);
				
			})
			.then(address => {
				if (!address) navigation.replace('HomeRoutes', { screen: 'NewAddressScreen' });

				return navigation.replace('HomeRoutes', { screen: 'FeedScreen' });
			})
			.catch((err)=>{
				Alert.alert(
					'Ops, Ocorreu um erro!',
					getErrorMessage(err.message),
					[
						{ text: 'Tentar novamente', onPress: init },
						{ text: 'Cancelar', onPress: ()=>{ logUserOut(); resetAddress(); } }
					]
				);
			})

		setupUpdates()
	}

	function setupUpdates() {
		Updates.addListener(({ type })=>{
			if (type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
				Alert.alert(
					'Há uma nova versão disponível',
					'Para ter uma melhor experiência, você precisa reiniciar o app',
					[
						{ text: 'Sim (Isso irá limpar sua cesta)', onPress: ()=>Updates.reloadAsync() }
					]
				)
			}
		})
	}

	return (
		<View style={{ flex: 1 }}>
			<ImageBackground style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} resizeMode='cover' source={BgWelcome}>
				<View>
					<Image source={LogoSymbol} resizeMode='contain' style={{ width: 110, marginBottom: 25 }} />
					<ActivityIndicator color={palette.primary.main} size='large' />
				</View>
			</ImageBackground>
		</View>
	);
}