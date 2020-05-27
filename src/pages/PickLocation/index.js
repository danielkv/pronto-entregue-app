import React, { useState, useRef } from 'react';
import { StyleSheet, Alert, View, Dimensions } from 'react-native';
import MapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps';

import { useMutation } from '@apollo/react-hooks';
import { useRoute, useNavigation } from '@react-navigation/core';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { cloneDeep } from 'lodash';

import LoadingBlock from '../../components/LoadingBlock';

import { sanitizeAddress } from '../../controller/address';
import { useLoggedUserId } from '../../controller/hooks';
import { Icon, useTheme, Button, Paper, Typography, IconButton } from '../../react-native-ui';
// import mapStyle from '../../services/mapStyle.json';
import { calculateDistance } from '../../utils';
import { getErrorMessage } from '../../utils/errors';
import { Container, PointerContainer, PinShadow } from './styles';

import { SET_SELECTED_ADDRESS } from '../../graphql/addresses';
import { CREATE_USER_ADDRESS, GET_USER_ADDRESSES } from '../../graphql/users';

const maxDistance = 500; // meters

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
	const { params: { address = null } } = useRoute();
	
	const navigation = useNavigation();
	const { palette } = useTheme();
	const MapRef = useRef();
	const [loadingLocation, setLoadingLocation] = useState(false);

	const [screenWidth, setScreenWidth] = useState(()=>dimensionWidth-1);
	const [mapPadding, setMapPadding] = useState(215);
	const [loadingSelect, setLoadingSelect] = useState(false);

	const loggedUserId = useLoggedUserId();
	const [createAddress] = useMutation(CREATE_USER_ADDRESS, { refetchQueries: [{ query: GET_USER_ADDRESSES, variables: { id: loggedUserId } }] });
	const [setSelectedAddress] = useMutation(SET_SELECTED_ADDRESS);
	
	const initialCamera = {
		...clearCamera,
		center: {
			latitude: address.location[0],
			longitude: address.location[1],
		},
	}
	const [camera, setCamera] = useState(()=>initialCamera);
	
	function handleMapReady() {
		setScreenWidth(dimensionWidth)
	}

	function moveCameraTo(location, zoom=18) {
		const newCamera = camera ? cloneDeep(camera) : cloneDeep(clearCamera)
		newCamera.center = { latitude: location.coords.latitude, longitude: location.coords.longitude };
		newCamera.zoom = zoom;
		//setCamera(newCamera)
		MapRef.current.animateCamera(newCamera);
	}

	function getLocationAsync() {
		setLoadingLocation(true)

		Location.getProviderStatusAsync()
			.then(({ locationServicesEnabled }) => {
				if (!locationServicesEnabled) throw new Error('Sua localização não está ativa')
			})
			.then(async ()=>{
				await getPermission();
			
				let location = await Location.getCurrentPositionAsync({});

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

	async function getPermission() {
		const { status: statusGet } = await Permissions.getAsync(Permissions.LOCATION);

		if (statusGet !== 'granted') {
			const { status: statusASk } = await Permissions.askAsync(Permissions.LOCATION);
			if (statusASk !== 'granted') throw new Error('A permissão para acessar a localização foi negada')
		}
	}

	// REGION

	function changeAddressPoint(newRegion) {
		const actualDistance = address ? calculateDistance(newRegion, initialCamera.center) : 0;
		if (actualDistance > maxDistance) {
			Alert.alert(
				'Essa localização é muito distante do endereço digitado na página anterior',
				'Deseja começar de novo?',
				[
					{ text: 'Não', onPress: ()=>MapRef.current.animateCamera(camera, 4000) },
					{ text: 'Sim', onPress: ()=>navigation.navigate('SearchAddressScreen') }
				]
			);
				
		} else
			setCamera({ ...camera, center: newRegion })
	}
	
	function handleRegionChange(newRegion) {
		changeAddressPoint(newRegion);
	}

	async function handleSaveAddress() {
		try {
			setLoadingSelect(true);

			const dataSave = { ...address, location: [camera.center.latitude, camera.center.longitude] };

			await setSelectedAddress({ variables: { address: dataSave } })
				.then(() => {
					//Toast.show('Endereço selecionado');

					navigation.dangerouslyGetParent().reset({
						index: 0,
						routes: loggedUserId
							? [{ name: 'HomeRoutes', params: { screen: 'FeedScreen' } }]
							: [{ name: 'WelcomeRoutes', params: { screen: 'AskLoginScreen' } }]
					})
				})

		} catch (err) {
			Alert.alert(getErrorMessage(err));
		} finally {
			setLoadingSelect(false);
		}
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
				{/* <Marker coordinate={camera.center} /> */}
				{!!address && <Circle
					center={initialCamera.center}
					radius={maxDistance}
					strokeWidth={4}
					strokeColor='rgba(65,84,20,.5)'
					fillColor='rgba(164,216,43,.1)'
				/>}
			</MapView>
			<PointerContainer style={{ marginTop: 10 -mapPadding }}>
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
				<Button
					disabled={loadingSelect}
					color='primary'
					variant='filled'
					onPress={handleSaveAddress}
				>
					{loadingSelect
						? <LoadingBlock />
						: <Typography variant='button'>Salvar e selecionar</Typography>}
				</Button>
			</Paper>}

			<View style={{ right: 20, bottom: mapPadding + 20, position: 'absolute' }}>
				{!loadingLocation &&
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