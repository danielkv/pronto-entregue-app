import React from 'react';
import { View } from 'react-native';

import LoginIllustration from '../../../assets/images/login-ill.png';
import SearchIllustration from '../../../assets/images/search-ill.png';
import SubscribeIllustration from '../../../assets/images/subscribe-ill.png';
import { Paper, Typography, useTheme } from '../../../react-native-ui';
import { ButtonTitle, ButtonSubtitle, ButtonImage, ButtonContainer } from './styles';


// import { Container } from './styles';

function SplashLogin() {
	const { palette } = useTheme();

	return(
		<View style={{ flex: 1, paddingTop: 80, width: '100%', paddingHorizontal: 10, backgroundColor: palette.background.main }}>
			<Paper style={{ paddingVertical: 10 }}>
				<Typography style={{
					textAlign: 'center',
					color: palette.primary.main,
					textTransform: 'uppercase',
					fontFamily: 'Roboto-Bold',
					fontSize: 20
				}}>Seja Bem Vindo</Typography>
				<Typography style={{ textAlign: 'center', fontSize: 12 }}>Selecione uma das opções</Typography>
			</Paper>
			<View style={{ flex: 1 }}>
				<ButtonContainer>
					<ButtonImage style={{ left: -40, marginTop: -35 }} source={LoginIllustration} />
					<ButtonTitle>Fazer login</ButtonTitle>
					<ButtonSubtitle>Já tenho uma conta</ButtonSubtitle>
				</ButtonContainer>
				<ButtonContainer>
					<ButtonImage source={SubscribeIllustration} />
					<ButtonTitle>Cadastrar</ButtonTitle>
					<ButtonSubtitle>Não tenho uma conta</ButtonSubtitle>
				</ButtonContainer>
				<ButtonContainer>
					<ButtonImage source={SearchIllustration} />
					<ButtonTitle>Procurar produtos</ButtonTitle>
					<ButtonSubtitle>Depois eu crio a conta</ButtonSubtitle>
				</ButtonContainer>
			</View>
		</View>
	);
}

export default SplashLogin;