import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Alert, View, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useRoute, useNavigation } from '@react-navigation/core';
import { cloneDeep } from 'lodash';

import LoadingBlock from '../../components/LoadingBlock';
import Header from '../../components/NewHeader';

import { sanitizeAddress } from '../../controller/address';
import { useLoggedUserId } from '../../controller/hooks';
import getLocation from '../../helpers/address/getGPSLocation';
import isMinimumValidAddress from '../../helpers/address/isMinimumValidAddress';
import isValidAddress from '../../helpers/address/isValidAddress';
import { Icon, useTheme, Button, Paper, IconButton } from '../../react-native-ui';
// import mapStyle from '../../services/mapStyle.json';
import { getErrorMessage } from '../../utils/errors';
import { Container, PointerContainer, PinShadow } from './styles';

import { SET_SELECTED_ADDRESS, SET_USER_ADDRESS, SEARCH_LOCATION } from '../../graphql/addresses';

const clearCamera = {
	center: {},
	pitch: 0,
	heading: 0,
	altitude: 100,
	zoom: 6
}

const initialCamera = {
	...clearCamera,
	center: {
		latitude: -27.26640280619224,
		latitudeDelta: 6.885547252090703,
		longitude: -50.19059563055634,
		longitudeDelta: 5.61006847769022
	}
}

const dimensionWidth = Math.round(Dimensions.get('window').width);
const paddingOffset = 20;

export default function MapScreen() {
	const { params: { address = null, redirect = { screen: 'FeedScreen' } } = {} } = useRoute();
	
	const navigation = useNavigation();
	const { palette } = useTheme();
	const MapRef = useRef();
	const [loadingLocation, setLoadingLocation] = useState(true);
	const apolloClient = useApolloClient();

	const [screenWidth, setScreenWidth] = useState(()=>dimensionWidth-1);
	const [mapPadding, setMapPadding] = useState(215);
	const [loadingSelect, setLoadingSelect] = useState(false);

	const loggedUserId = useLoggedUserId();
	const [setSelectedAddress] = useMutation(SET_SELECTED_ADDRESS);
	const [createUserAddress] = useMutation(SET_USER_ADDRESS);

	const [camera, setCamera] = useState(null);
	
	function handleMapReady() {
		setScreenWidth(dimensionWidth)

		if (address) {
			const coords = addressToCamera(address).center;
			moveCameraTo({ coords });
		}
	}

	function centerUserLocation() {
		setLoadingLocation(true)
		return getLocation()
			.then(location => {
				moveCameraTo(location)
			})
			.then(()=>{
				setLoadingLocation(false);
			})
			.catch(err => {
				Alert.alert('Ocorreu um erro', err.message, [
					{ text: 'Tentar novamente', onPress: centerUserLocation }
				])
			});
	}

	useEffect(()=>{
		if (address) return setLoadingLocation(false);

		centerUserLocation()
	}, [address])

	function moveCameraTo(location, zoom=18) {
		const newCamera = camera ? cloneDeep(camera) : cloneDeep(clearCamera)
		newCamera.center = { latitude: location.coords.latitude, longitude: location.coords.longitude };
		newCamera.zoom = zoom;
		setCamera(newCamera)
		MapRef.current.animateCamera(newCamera);
	}

	function addressToCamera (address, zoom=18) {
		const { location } = address;
		const newCamera = cloneDeep(clearCamera)
		newCamera.center = { latitude: location[0], longitude: location[1] };
		newCamera.zoom = zoom;
		return newCamera;
	}

	function cameraToLocation(camera) {
		return [camera.center.latitude, camera.center.longitude];
	}

	// REGION

	function changeAddressPoint(newRegion) {
		setCamera({ ...camera, center: newRegion })
	}
	
	function handleRegionChange(newRegion) {
		changeAddressPoint(newRegion);
	}

	async function handleSaveAddress() {
		try {
			const validAddress = address && camera ? isValidAddress({ ...address, location: cameraToLocation(camera) }) : false;
			if (!validAddress) throw new Error('Verifique o endereço, ele não é válido.');

			setLoadingSelect(true);
			const normalizedAddress = sanitizeAddress({ ...address, location: cameraToLocation(camera) });
						
			return createUserAddress({ variables: { userId: loggedUserId, addressData: normalizedAddress } })
				.then(({ data: { setUserAddress } })=>{
					return setSelectedAddress({ variables: { address: setUserAddress } })
				})
				.then(()=>{
					navigation.reset({
						index: 0,
						routes: [{ name: redirect.screen, params: redirect.params }]
					})
				});

		} catch (err) {
			Alert.alert(getErrorMessage(err));
		} finally {
			setLoadingSelect(false);
		}
	}

	async function handleContinueAddress() {
		try {
			setLoadingSelect(true);

			const location = cameraToLocation(camera)
			let normalizedAddress = {};

			if (address) {
				normalizedAddress = sanitizeAddress({ ...address, location });
			} else {
				const { data: { searchLocation: addressFound } } = await apolloClient.mutate({ mutation: SEARCH_LOCATION, variables: { location } });
				normalizedAddress = sanitizeAddress({ ...addressFound, location });
			}
				
			// if address is not enough to get data
			if (!normalizedAddress.city || !normalizedAddress.state || !normalizedAddress.location)
				return navigation.navigate('TypeAddressScreen', { address: normalizedAddress })

			//console.log(normalizedAddress);
			
			await setSelectedAddress({ variables: { address: normalizedAddress } })
				.then(()=>{
					navigation.reset({
						index: 0,
						routes: [{ name: redirect.screen, params: redirect.params }]
					})
				});

		} catch (err) {
			Alert.alert(getErrorMessage(err));
		} finally {
			setLoadingSelect(false);
		}
	}

	const isMinimumValid = isMinimumValidAddress(address);
	const isValid = isValidAddress(address);

	return (
		<View style={{ flex: 1 }}>
			<Header headerTransparent={true} variant='transparent' searchIcon={false} />
			<Container>
				<MapView
					showsBuildings={false}
					pitchEnabled={false}
					showsTraffic={false}
					ref={MapRef}
					showsMyLocationButton={false}
					showsUserLocation={true}
					userLocationAnnotationTitle='Meu local atual'
					scrollEnabled={!loadingLocation}
					
					initialCamera={initialCamera}
					provider={PROVIDER_GOOGLE}
					style={[styles.mapStyle, { width: screenWidth }]}
					onMapReady={handleMapReady}
					onRegionChangeComplete={handleRegionChange}
					//customMapStyle={mapStyle}
					rotateEnabled={false}
					mapPadding={{
						bottom: mapPadding
					}}
				/>
				{loadingLocation
					? <ActivityIndicator color={palette.primary.main} />
					: <PointerContainer style={{ marginTop: 10 -mapPadding }}>
						<PinShadow />
						<Icon name='map-pin' size={60} color={palette.primary.main} />
					</PointerContainer>}
				{!loadingLocation && <Paper
					onLayout={(event)=>{
						const { height } = event.nativeEvent.layout;
						setMapPadding(height + paddingOffset);
					}}
					style={{
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 2,
						},
						shadowOpacity: 0.25,
						shadowRadius: 3.84,

						elevation: 5,
						position: 'absolute',
						bottom: 10,
						left: 10,
						right: 10,
						alignItems: 'center'
					}}
				>
					{loggedUserId && isValid
						&& <Button
							icon='check'
							disabled={loadingSelect}
							color='primary'
							variant='filled'
							onPress={handleSaveAddress}
						>
							{loadingSelect
								? <LoadingBlock />
								: 'Salvar e Utilizar'}
						</Button>}
					
					{!isMinimumValid && <Button
						icon='arrow-right-circle'
						disabled={loadingSelect}
						color='default'
						variant='filled'
						onPress={handleContinueAddress}
					>
						{loadingSelect
							? <LoadingBlock />
							: 'Continuar'}
					</Button>}
				</Paper>}

				<View style={{ right: 20, bottom: mapPadding + 20, position: 'absolute' }}>
					{!loadingLocation &&
						<IconButton
							icon={{ name: 'crosshairs-gps', type: 'material-community' }}
							onPress={centerUserLocation}
							disabled={loadingLocation}
							variant='filled'
							color='primary'
						/>
					}
				</View>
			</Container>
		</View>
	);
}
			
			
const styles = StyleSheet.create({
	mapStyle: {
		...StyleSheet.absoluteFillObject
	},
});