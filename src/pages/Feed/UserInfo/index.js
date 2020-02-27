import React from 'react';

import { useNavigation } from '@react-navigation/core';

import { Typography, useTheme, Button } from '../../../react-native-ui';
import { useSelectedAddress } from '../../../utils/hooks';
import { Container, UserNameContainer, UserName, UserLocationContainer } from './styles';

export default function UserInfo() {
	const { palette } = useTheme();
	const selectedAddress = useSelectedAddress();
	const navigation = useNavigation();

	return (
		<Container>
			<UserNameContainer>
				<UserName variant='h1'>{`Oi,\nDaniel`}</UserName>
			</UserNameContainer>
			{selectedAddress && (
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
						style={{ button: { height: 30 }, text: { textTransform: 'none' } }}
						icon={{ name: 'map-pin', size: 16 }}
						onPress={()=>navigation.navigate('SelectAddressScreen')}
					>
						{`${selectedAddress.city}, ${selectedAddress.state}`}
					</Button>
				</UserLocationContainer>
			)}
		</Container>
	);
}
