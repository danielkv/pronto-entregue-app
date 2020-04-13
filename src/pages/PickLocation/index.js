import React, { useState, useRef } from 'react';
import { StyleSheet, Alert, View, ActivityIndicator, Dimensions } from 'react-native';
import MapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps';

import { useMutation } from '@apollo/react-hooks';
import { useRoute, useNavigation } from '@react-navigation/core';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { cloneDeep } from 'lodash';

import { extractAddress } from '../../controller/address';
import { Icon, useTheme, Button, Paper, FormHelperText, Typography, IconButton } from '../../react-native-ui';
// import mapStyle from '../../services/mapStyle.json';
import { calculateDistance } from '../../utils';
import { getErrorMessage } from '../../utils/errors';
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

const locationNotGranted = {
	latitude: -27.26640280619224,
	latitudeDelta: 6.885547252090703,
	longitude: -50.19059563055634,
	longitudeDelta: 5.61006847769022
}

const dimensionWidth = Math.round(Dimensions.get('window').width);
const paddingOffset = 20;

export default function PickLocation() {
	const { params: { address = null, pickUserLocation = null } } = useRoute();
	
	const navigation = useNavigation();
	const { palette } = useTheme();
	const MapRef = useRef();
	const [loadingLocation, setLoadingLocation] = useState(false);
	const [locationError, setLocationError] = useState('');
	const [selectedAddress, setSelectedAddress] = useState(()=>address || null);

	const [screenWidth, setScreenWidth] = useState(()=>dimensionWidth-1);
	const [mapPadding, setMapPadding] = useState(215);

	const [searchLocation, { loading: loadingGeoLocation }] = useMutation(SEARCH_LOCATION)
	
	const initialCamera = !pickUserLocation ? {
		...clearCamera,
		center: {
			latitude: address.location[0],
			longitude: address.location[1],
		},
	} : null
	const [camera, setCamera] = useState(()=>initialCamera);
	
	function handleMapReady() {
		setScreenWidth(dimensionWidth)
		
		if (pickUserLocation) getLocationAsync();
	}

	function moveCameraTo(location, zoom=18) {
		const newCamera = camera ? cloneDeep(camera) : cloneDeep(clearCamera)
		newCamera.center = { latitude: location.coords.latitude, longitude: location.coords.longitude };
		newCamera.zoom = zoom;
		setCamera(newCamera)
		MapRef.current.animateCamera(newCamera);
	}

	function getLocationAsync() {
		setLoadingLocation(true)

		Location.getProviderStatusAsync()
			.then(({ locationServicesEnabled }) => {
				if (!locationServicesEnabled) throw new Error('Sua localização não está ativa')
			})
			.then(async ()=>{
				let { status } = await Permissions.askAsync(Permissions.LOCATION);
				if (status !== 'granted') throw new Error('A permissão para acessar a localização foi negada')
			
				let location = await Location.getCurrentPositionAsync({});

				await geoLocate(location.coords);

				moveCameraTo(location);
			})
			.catch((err) => {
				Alert.alert(
					'Ops, Ocorreu um erro!',
					getErrorMessage(err),
					[
						{ text: 'Tentar novamente', onPress: ()=>getLocationAsync() },
						{ text: 'Encontrar local no mapa', onPress: ()=>moveCameraTo({ coords: locationNotGranted }, 7) },
					]
				);
			})
			.finally(()=>{
				setLoadingLocation(false)
			})
	}
	async function geoLocate(location) {
		setLocationError('')
		const { data: { searchLocation: address } } = await searchLocation({ variables: { location: [location.latitude, location.longitude] } });

		if (address.state && address.city)
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
				showsUserLocation={true}
			
				provider={PROVIDER_GOOGLE}
				style={[styles.mapStyle, { width: screenWidth }]}
				onMapReady={handleMapReady}
				initialCamera={initialCamera}
				onRegionChangeComplete={handleRegionChange}
				//customMapStyle={mapStyle}
				rotateEnabled={false}
				mapPadding={{
					bottom: mapPadding
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
			<PointerContainer style={{ marginTop: 58 - 215 }}>
				<PinShadow />
				<Icon name='map-pin' size={60} color={palette.primary.main} />
			</PointerContainer>
			{<Paper
				onLayout={(event)=>{
					const { height } = event.nativeEvent.layout;
					setMapPadding(height + paddingOffset);
				}}
				style={{
					elevation: 8,
					position: 'absolute',
					bottom: 10,
					left: 10,
					right: 10,
					alignItems: 'center'
				}}
			>
				{loadingLocation || loadingGeoLocation
					? <ActivityIndicator color={palette.primary.main} style={{ marginBottom: 20 }} />
					: !!selectedAddress && (<View style={{ marginBottom: 20 }}>
						<Typography variant='h4' style={{ fontWeight: "bold", textAlign: 'center' }}>{`${selectedAddress?.street || ''}${selectedAddress.number ? `, ${selectedAddress.number}` : ''}`}</Typography>
						<Typography variant='h5' style={{ textAlign: 'center' }}>{`${selectedAddress.city} - ${selectedAddress.state}`}</Typography>
					</View>)}

				{!!locationError && <FormHelperText style={{ textAlign: 'center', }} error>{locationError}</FormHelperText>}
				<Button
					disabled={!selectedAddress}
					label='Confirmar Localização'
					color='primary'
					variant='filled'
					onPress={()=>navigation.navigate('ConfirmAddressScreen', { address: extractAddress(selectedAddress) })}
				/>
			</Paper>}

			<View style={{ right: 20, bottom: mapPadding + 20, position: 'absolute' }}>
				{!loadingLocation && !loadingGeoLocation &&
					<IconButton
						icon={{ name: 'crosshairs-gps', type: 'material-community' }}
						onPress={()=>{getLocationAsync()}}
						disabled={loadingLocation}
						variant='filled'
						color='primary'
					/>
				}
			</View>
		</Container>
	);
}
			
			
const styles = StyleSheet.create({
	mapStyle: {
		...StyleSheet.absoluteFillObject
	},
});