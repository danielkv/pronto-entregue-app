import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

import { Typography, Chip } from '../../../../react-native-ui'
import { Container, BgImage } from './styles';

export default function FeaturedItem({ item, config }) {
	const navigation = useNavigation();

	return (
		<Container onPress={()=>{navigation.navigate('ProductScreen', { productId: item.id })}}>
			<BgImage config={config} source={{ uri: item.image }}>
				<View>
					<LinearGradient
						colors={['#0000', '#000f']}
						style={{ paddingHorizontal: 15, paddingVertical: 10 }}
					>
						<Typography variant='title' style={{ color: '#fff' }}>{item.name}</Typography>
					</LinearGradient>
				</View>
				<Chip
					label='10%'
					color='secondary'
					style={{
						root: {
							borderTopRightRadius: 0,
							borderBottomRightRadius: 15,
							position: 'absolute',
							bottom: 0,
							right: 0
						}
					}}
				/>
			</BgImage>
		</Container>
	);
}
