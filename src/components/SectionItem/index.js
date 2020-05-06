import React from 'react';
import { View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Typography } from '../../react-native-ui'
import { Container, BgImage } from './styles';

export default function SectionItem({ section, onPress, dense=false }) {
	return (
		<Container dense={dense} onPress={onPress}>
			<BgImage source={{ uri: section.image }} resizeMode='cover'>
				<View>
					<LinearGradient
						colors={['#0000', '#000f']}
						style={{ paddingHorizontal: 15, paddingTop: 30, paddingBottom: 15 }}
					>
						<Typography variant='title' style={{ color: '#fff', fontSize: 16 }}>{section.name}</Typography>
					</LinearGradient>
				</View>
			</BgImage>
		</Container>
	);
}
