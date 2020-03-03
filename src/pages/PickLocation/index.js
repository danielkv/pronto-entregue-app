import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Alert, View, ActivityIndicator } from 'react-native';
import MapView, { Circle } from 'react-native-maps';

import { useMutation } from '@apollo/react-hooks';
import { useRoute, useNavigation } from '@react-navigation/core';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { cloneDeep } from 'lodash';


import { extractAddress } from '../../controller/address';
import { Icon, useTheme, Button, Paper, FormHelperText, Typography } from '../../react-native-ui';
// import mapStyle from '../../services/mapStyle.json';
import { calculateDistance } from '../../utils';
import { Container, PointerContainer, PinShadow } from './styles';

import { SEARCH_LOCATION } from '../../graphql/addresses';


const maxDistance = 200; // meters

const clearCamera = {
	center: {},
	pitch: 0,
	heading: 0,
	altitude: 100,
	zoom: 18
}


export default function PickLocation() {
	const { params: { address, pickUserLocation } } = useRoute();
	const navigation = useNavigation();
	const { palette, header } = useTheme();
	const MapRef = useRef();
	const [locationError, setLocationError] = useState('');
	const [selectedAddress, setSelectedAddress] = useState(()=>address || null);

	const [searchLocation, { loading: loadingGeoLocation }] = useMutation(SEARCH_LOCATION)
	
	const initialCamera = !pickUserLocation ? {
		...clearCamera,
		center: {
			latitude: address.location[0],
			longitude: address.location[1],
		},
	} : null
	const [camera, setCamera] = useState(()=>initialCamera);
	
	useEffect(()=>{
		if (pickUserLocation) getLocationAsync();
	}, []);

	function getLocationAsync() {
		Location.getProviderStatusAsync()
			.then(async ()=>{
				let { status } = await Permissions.askAsync(Permissions.LOCATION);
				if (status !== 'granted') {
					setLocationError('A permissão para acesssar a localização foi negada');
				}
			
				let location = await Location.getCurrentPositionAsync({});

				geoLocate(location.coords);

				const newCamera = camera ? cloneDeep(camera) : cloneDeep(clearCamera)
				newCamera.center = { latitude: location.coords.latitude, longitude: location.coords.longitude };
				setCamera(newCamera)
				MapRef.current.animateCamera(newCamera);
			});
	}
	async function geoLocate(location) {
		setLocationError('')
		const { data: { searchLocation: address } } = await searchLocation({ variables: { location: [location.latitude, location.longitude] } });

		if (address.street && address.state && address.city)
			setSelectedAddress(address);
		else {
			setSelectedAddress(null);
			setLocationError('O endereço não foi encontrado')
		}
	}

	// REGION

	function changeAddressPoint(newRegion) {
		const actualDistance = address ? calculateDistance(newRegion, initialCamera.center) : 0;
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
	
	function handleRegionChange(newRegion) {
		if (pickUserLocation) {
			geoLocate(newRegion);
		} else
			changeAddressPoint(newRegion);
	}

		
	return (
		<Container>
			<MapView
				showsBuildings={false}
				pitchEnabled={false}
				showsTraffic={false}
				ref={MapRef}
				showsMyLocationButton={false}
			
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
				{!!address && <Circle
					center={initialCamera.center}
					radius={maxDistance}
					strokeWidth={4}
					strokeColor='rgba(65,84,20,.5)'
					fillColor='rgba(164,216,43,.1)'
				/>}
			</MapView>
			<PointerContainer>
				<PinShadow />
				<Icon name='map-pin' size={60} color={palette.primary.main} />
			</PointerContainer>
			<Paper
				style={{
					elevation: 8,
					position: 'absolute',
					bottom: 10,
					left: 10,
					right: 10,
					alignItems: 'center'
				}}
			>
				{loadingGeoLocation
					? <ActivityIndicator color={palette.primary.main} style={{ marginBottom: 20 }} />
					: !!selectedAddress && (<View style={{ marginBottom: 20 }}>
						<Typography variant='h4' style={{ fontWeight: "bold", textAlign: 'center' }}>{`${selectedAddress.street} ${selectedAddress.number ? `, ${selectedAddress.number}` : ''}`}</Typography>
						<Typography variant='h5' style={{ textAlign: 'center' }}>{`${selectedAddress.city}, ${selectedAddress.state}`}</Typography>
					</View>)}

				{!!locationError && <FormHelperText style={{ textAlign: 'center', }} error>{locationError}</FormHelperText>}
				<Button
					disabled={!selectedAddress}
					label='Confirmar Localização'
					color='primary'
					variant='filled'
					onPress={()=>navigation.navigate('ConfirmAddressScreen', { address: extractAddress(selectedAddress) })}
				/>
			</Paper>
		</Container>
	);
}
			
			
const styles = StyleSheet.create({
	mapStyle: {
		width: '100%',
		height: '100%',
	},
});