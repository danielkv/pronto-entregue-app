import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';


import { useNetInfo } from "@react-native-community/netinfo";
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';

import { Icon, useTheme, Typography, Chip } from '../../react-native-ui';

// import { Container } from './styles';
let timeOut = null;

export default function ConnectionInfoPanel() {
	const { palette } = useTheme();
	const { isConnected, isInternetReachable } = useNetInfo();
	const [connected, setConnected] = useState(true);

	useEffect(()=>{
		if (timeOut) clearTimeout(timeOut);

		if (!isConnected || !isInternetReachable) {
			timeOut = setTimeout(()=>setConnected(false), 3000);
		} else {
			setConnected(true);
		}
	}, [isConnected, isInternetReachable])


	if (connected) return false;

	return (
		<BlurView
			style={{
				position: 'absolute',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				width: '100%',
				height: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 35,
			}}
			tint='dark'
			intensity={Platform.OS === 'ios' ? 100 : 150}
		>
			<StatusBar style='light' />
			<Icon name='wifi-off' color={palette.secondary.main} size={50} />
			<Chip color='primary' style={{ root: { alignSelf: 'auto', marginTop: 10 } }}>Falha na conexão</Chip>
			<Typography variant='h5' style={{ color: '#fff', textAlign: "center", marginTop: 10, textShadowRadius: 8, textShadowColor: '#000000', textShadowOffset: { x: 2, y: 2 } }}>O App ficará disponível assim que sua conexão com a internet for estabelecida</Typography>
		</BlurView>
	);
}
