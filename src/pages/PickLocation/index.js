import React, { useState, useRef } from 'react';
import { StyleSheet, Alert } from 'react-native';
import MapView, { Circle } from 'react-native-maps';

import { useRoute, useNavigation } from '@react-navigation/core';

import { Icon, useTheme, Button } from '../../react-native-ui';
// import mapStyle from '../../services/mapStyle.json';
import { calculateDistance } from '../../utils';
import { Container, PointerContainer, PinShadow } from './styles';


const maxDistance = 200; // meters

export default function PickLocation() {
	const { params: { address } } = useRoute();
	const navigation = useNavigation();
	const { palette, header } = useTheme();
	const MapRef = useRef();

	const initialCamera = {
		center: {
			latitude: address.location[0],
			longitude: address.location[1],
		},
		pitch: 0,
		heading: 0,
		altitude: 100,
		zoom: 18
	}
	const [camera, setCamera] = useState(()=>initialCamera);

	function handleRegionChange(newRegion) {
		const actualDistance = calculateDistance(newRegion, initialCamera.center);
		if (actualDistance > maxDistance) {
			Alert.alert(
				'A localização definida é muito longe do endereço selecionado',
				'Deseja buscar outro endereço?',
				[
					{ text: 'Não', onPress: ()=>MapRef.current.animateCamera(camera, 4000) },
					{ text: 'Sim', onPress: ()=>navigation.navigate('SearchAddressScreen') }
				]
			);
			
		} else
			setCamera({ ...camera, center: newRegion })
	}

	return (
		<Container style={styles.container}>
			<MapView
				showsBuildings={false}
				pitchEnabled={false}
				showsTraffic={false}
				ref={MapRef}

				provider='google'
				style={styles.mapStyle}
				initialCamera={initialCamera}
				onRegionChangeComplete={handleRegionChange}
				//customMapStyle={mapStyle}
				rotateEnabled={false}
				legalLabelInsets={{
					top: header.height+10,
					bottom: 80
				}}
			>
				<Circle
					center={initialCamera.center}
					radius={maxDistance}
					strokeWidth={4}
					strokeColor='rgba(65,84,20,.5)'
					fillColor='rgba(164,216,43,.1)'
				/>
			</MapView>
			<PointerContainer>
				<PinShadow />
				<Icon name='map-pin' size={60} color={palette.primary.main} />
			</PointerContainer>
			<Button
				label='Confirmar Localização'
				color='primary'
				variant='filled'
				fullWidth={false}
				style={{
					root: {
						position: 'absolute',
						bottom: 20,
						left: 20,
						right: 20,
					}
				}}
			/>
		</Container>
	);
}
	
	
const styles = StyleSheet.create({
	mapStyle: {
		width: '100%',
		height: '100%',
	},
});