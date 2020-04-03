import React from 'react';
import { View, StatusBar } from 'react-native';

import { useNetInfo } from "@react-native-community/netinfo";

import { Icon, useTheme, Typography, Chip } from '../../react-native-ui';

// import { Container } from './styles';

export default function ConnectionInfoPanel() {
	const { palette } = useTheme();
	const netInfo = useNetInfo();

	if (netInfo.isConnected && netInfo.isInternetReachable) return false;

	return (
		<View
			style={{
				position: 'absolute',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(0,0,0,0.7)',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 35,
			}}
		>
			<StatusBar barStyle='light-content' />
			<Icon name='wifi-off' color={palette.secondary.main} size={50} />
			<Chip color='primary' style={{ root: { alignSelf: 'auto', marginTop: 10 } }}>Falha na conexão</Chip>
			<Typography variant='h5' style={{ color: '#fff', textAlign: "center", marginTop: 10 }}>O App ficará disponível assim que sua internet for ativada</Typography>
		</View>
	);
}
