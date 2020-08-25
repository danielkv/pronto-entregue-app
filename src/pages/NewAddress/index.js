import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import BigHeader from '../../components/BigHeader';

import MapIllustration from '../../assets/images/map-ill.png';
import { Typography, Icon, useTheme } from '../../react-native-ui';
import { Block, BlockText } from './styles';

export default function NewAddress() {
	const { palette } = useTheme();
	const navigation = useNavigation()

	return (
		<View style={{ flex: 1, position: 'relative' }}>
		
			<BigHeader title={'Novo\nendereço'} image={MapIllustration} imageStyle={{ left: -60, width: '100%', transform: [{ rotate: '-15deg' }] }} />
			<View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 10, marginTop: '-15%' }}>

				<Typography style={{ textAlign: 'center', marginHorizontal: 20 }}>Para buscar os melhores estabelecimentos para você precisamos saber onde você está</Typography>
				
				<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
					<Icon name='chevrons-down' color={palette.background.dark} size={22} />
					<Icon name='chevrons-down' color={palette.background.dark} size={22} />
				</View>

				<View style={{ flexDirection: 'row' }}>
					<Block onPress={()=>navigation.navigate('TypeAddressScreen')}>
						<Icon name='edit-3' size={50} color={palette.primary.main} />
						<BlockText>Digitar{'\n'}endereço</BlockText>
					</Block>
					<Block>
						<Icon name='map-pin' size={50} color={palette.primary.main} />
						<BlockText>Buscar{'\n'}localização</BlockText>
					</Block>
				</View>
				
				<View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'flex-start' }}>
					<Icon style={{ root: { margin: 0, marginLeft: 10, marginRight: 10 } }} name='info' color={palette.background.dark} size={20} />
					<Typography style={{ flex: 1, textAlign: 'left', color: palette.background.dark, fontSize: 12 }}>Lembre-se de verificar a localização! Ela ajuda a te encontrar. Assim sua entrega chega muito mais rápido e sem problemas. 🙃</Typography>
				</View>
			</View>

		</View>
	);
}