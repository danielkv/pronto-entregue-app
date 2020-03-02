import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

import { Typography, Chip } from '../../../../react-native-ui'
import { Container, BgImage, TextContainer } from './styles';

export default function FeaturedItem({ item, config }) {
	const navigation = useNavigation();

	const diff = item.price - item.sale.price;
	const pct = Math.floor(diff * 100 / item.price);

	return (
		<Container onPress={()=>{navigation.navigate('ProductScreen', { productId: item.id })}}>
			<BgImage config={config} source={{ uri: item.image }}>
				<View>
					<LinearGradient
						colors={['#0000', '#000f']}
						style={{ paddingHorizontal: 15, paddingBottom: 15, paddingTop: 20 }}
					>
						<TextContainer>
							<Typography variant='subtitle' style={{ color: '#fff' }}>{item.company.displayName}</Typography>
							<Typography variant='title' style={{ color: '#fff' }}>{item.name}</Typography>
						</TextContainer>
					</LinearGradient>
				</View>
				<Chip
					label={`-${pct}%`}
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
