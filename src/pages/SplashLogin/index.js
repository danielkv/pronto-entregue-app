import React, { useEffect, useState, useRef } from 'react';
import { View, Alert } from 'react-native';
import Animated, { Easing, Transition, Transitioning } from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/core';
import * as Updates from 'expo-updates';

import LogoSymbol from '../../assets/images/logo.png';
import getUserLastOrderAddress from '../../helpers/address/getUserClosestAddress';
import resetAddress from '../../helpers/address/resetAddress';
import isUserLoggedIn from '../../helpers/auth/isUserLoggedIn';
import logUserIn from '../../helpers/auth/logUserIn';
import logUserOut from '../../helpers/auth/logUserOut';
import { useTheme } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import SelectLogin from './selectLogin';

export default function LocationAccess() {
	const opacity = new Animated.Value(1);
	const { palette } = useTheme();
	const navigation = useNavigation();
	const [loading, setLoading] = useState(true);

	const animationRef = useRef();

	const transition = (
		<Transition.Together>
			<Transition.In type='slide-bottom' />
			<Transition.Out type='fade' />
		</Transition.Together>
	)

	useEffect(()=>{
		setupUpdates()

		init()
	}, [])
	
	useEffect(()=>{
		animateLogo();
	}, [])

	function animateLogo() {
		Animated.timing(opacity, {
			duration: 800,
			toValue: 0.3,
			easing: Easing.ease
		}).start(()=>{
			Animated.timing(opacity, {
				duration: 800,
				toValue: 1,
				easing: Easing.ease
			}).start(()=>{
				animateLogo();
			});
		});
	}

	function showSplashLogin() {
		animationRef.current.animateNextTransition();
		setLoading(false);
	}

	async function init() {
		try {
			const userData = await isUserLoggedIn()
		
			// if user is not logged, navigate to splashlogin
			if (!userData?.user) return setTimeout(showSplashLogin, 2000);
			const { user, token } = userData;

			// log user in system
			logUserIn(user, token);

			// check user address, if doesn't find any navigate to new address screen
			const userAddress = await getUserLastOrderAddress(user);
			if (!userAddress) navigation.replace('HomeRoutes', { screen: 'NewAddressScreen' });

			// navigate to feed
			return navigation.replace('HomeRoutes', { screen: 'FeedScreen' });
			
		} catch (err) {
			Alert.alert(
				'Ops, Ocorreu um erro!',
				getErrorMessage(err.message),
				[
					{ text: 'Tentar novamente', onPress: init },
					{ text: 'Cancelar', onPress: ()=>{ logUserOut(); resetAddress(); } }
				]
			);
		}
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
		<View style={{
			flex: 1,
			backgroundColor: palette.primary.main,
		}}>
			<Transitioning.View
				ref={animationRef}
				transition={transition}
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				{loading
					? <Animated.Image source={LogoSymbol} resizeMode='contain' style={[{ width: 110, marginBottom: 25 }, { opacity }]} />
					: <SelectLogin />}
			</Transitioning.View>
		</View>
	);
}