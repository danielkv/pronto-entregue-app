import React from 'react';
import { Image, ActivityIndicator, Text } from 'react-native';

import logoCopeiro from '../../assets/images/logo-copeiro.png';
import { Container } from "./styles";
import { useInitialize } from '../../services/init';

export default function splashScreen({navigation}) {
	const {loading, selectedBranch} = useInitialize();
	
	//if (!loading && selectedBranch !== null) navigation.navigate('RootApp');

	return (
		<Container>
			<Image style={{marginBottom:20}} resizeMethod='resize' source={logoCopeiro} />
			{loading ? <ActivityIndicator size={28} color='#B95A02' /> :
			<Text>teste</Text>
			}
		</Container>
	);
}
