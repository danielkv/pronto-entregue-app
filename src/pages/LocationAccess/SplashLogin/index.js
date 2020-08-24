import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { Transitioning, Transition } from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/core';

import LoginIllustration from '../../../assets/images/login-ill.png';
import SearchIllustration from '../../../assets/images/search-ill.png';
import SubscribeIllustration from '../../../assets/images/subscribe-ill.png';
import { Paper, Typography, useTheme } from '../../../react-native-ui';
import { ButtonTitle, ButtonSubtitle, ButtonImage, ButtonContainer } from './styles';


// import { Container } from './styles';

function SplashLogin() {
	const { palette } = useTheme();
	const [show, setShow] = useState(false);
	const transitionRef = useRef();
	const navigation = useNavigation();

	useEffect(()=>{
		if (!show) {
			transitionRef.current.animateNextTransition();
			setShow(true);
		}
	}, [])

	const transition = (
		<Transition.Together>
			<Transition.In
				type='slide-bottom'
				durationMs={400}
				interpolation={"easeOut"}
				propagation='top'
			/>
		</Transition.Together>
	)

	return(
		<Transitioning.View
			ref={transitionRef}
			transition={transition}
			style={{ flex: 1, paddingTop: 30, width: '100%', paddingHorizontal: 10 }}
		>
			<View style={{ flex: 1 }}>
				<Paper style={{ paddingVertical: 10, marginVertical: 30 }}>
					<Typography style={{
						textAlign: 'center',
						color: palette.primary.main,
						textTransform: 'uppercase',
						fontFamily: 'Roboto-Bold',
						fontSize: 20
					}}>Seja Bem Vindo</Typography>
					<Typography style={{ textAlign: 'center', fontSize: 12 }}>Selecione uma das opções</Typography>
				</Paper>
				{show &&
				<View style={{ flex: 1 }}>
					<ButtonContainer onPress={()=>navigation.navigate('AuthenticationRoutes', { screen: 'LoginScreen' })}>
						<ButtonImage style={{ left: -40, marginTop: -35 }} source={LoginIllustration} />
						<ButtonTitle>Fazer login</ButtonTitle>
						<ButtonSubtitle>Já tenho uma conta</ButtonSubtitle>
					</ButtonContainer>
					<ButtonContainer onPress={()=>navigation.navigate('AuthenticationRoutes', { screen: 'SubscriptionScreen' })}>
						<ButtonImage source={SubscribeIllustration} />
						<ButtonTitle>Cadastrar</ButtonTitle>
						<ButtonSubtitle>Não tenho uma conta</ButtonSubtitle>
					</ButtonContainer>
					<ButtonContainer onPress={()=>navigation.navigate('AddressRoutes', { screen: 'NewAddressScreen' })}>
						<ButtonImage source={SearchIllustration} />
						<ButtonTitle>Procurar produtos</ButtonTitle>
						<ButtonSubtitle>Depois eu crio a conta</ButtonSubtitle>
					</ButtonContainer>
				</View>
				}
			</View>
		</Transitioning.View>
	);
}

export default SplashLogin;