import React from 'react';

import { Typography, useTheme, Button } from '../../../react-native-ui';
import { Container, UserNameContainer, UserName, UserLocationContainer } from './styles';

export default function UserInfo() {
	const { palette } = useTheme();

	return (
		<Container>
			<UserNameContainer>
				<UserName variant='h1'>{`Oi,\nDaniel`}</UserName>
			</UserNameContainer>
			<UserLocationContainer>
				<Typography
					variant='subtitle'
					style={{ color: palette.background.dark }}
				>
					Você está em
				</Typography>
				<Button
					color='primary'
					variant='filled'
					style={{ button: { height: 30 } }}
				>
					Sombrio, SC
				</Button>
			</UserLocationContainer>
		</Container>
	);
}
