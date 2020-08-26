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
import { Icon, useTheme, Button, Paper, Typography, IconButton } from '../../react-native-ui';
// import mapStyle from '../../services/mapStyle.json';
import { getErrorMessage } from '../../utils/errors';
import { Container, PointerContainer, PinShadow } from './styles';

import { SET_SELECTED_ADDRESS, SEARCH_LOCATION } from '../../graphql/addresses';
import { CREATE_USER_ADDRESS, GET_USER_ADDRESSES } from '../../graphql/users';

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
	const { params: { address = null } = {} } = useRoute();
	
	const navigation = useNavigation();
	const { palette } = useTheme();
	const MapRef = useRef();
	const [loadingLocation, setLoadingLocation] = useState(true);
	const apolloClient = useApolloClient();

	const [screenWidth, setScreenWidth] = useState(()=>dimensionWidth-1);
	const [mapPadding, setMapPadding] = useState(215);
	const [loadingSelect, setLoadingSelect] = useState(false);

	const loggedUserId = useLoggedUserId();
	const [createAddress] = useMutation(CREATE_USER_ADDRESS, { refetchQueries: [{ query: GET_USER_ADDRESSES, variables: { id: loggedUserId } }] });
	const [setSelectedAddress] = useMutation(SET_SELECTED_ADDRESS);
	
	const [camera, setCamera] = useState(null);
	
	function handleMapReady() {
		setScreenWidth(dimensionWidth)
	}

	function certerUserLocation() {
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
					{ text: 'Tentar novamente', onPress: certerUserLocation },
					{ text: 'Digitar outro endereço', onPress: ()=>navigation.navigate('TypeAddressScreen') },
				])
			});
	}

	useEffect(()=>{
		if (address) return setLoadingLocation(false);

		certerUserLocation()
	}, [])

	function moveCameraTo(location, zoom=18) {
		const newCamera = camera ? cloneDeep(camera) : cloneDeep(clearCamera)
		newCamera.center = { latitude: location.coords.latitude, longitude: location.coords.longitude };
		newCamera.zoom = zoom;
		setCamera(newCamera)
		MapRef.current.animateCamera(newCamera);
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
			setLoadingSelect(true);
			const location = camera.center;

			
			// load address from location
			const { data: { searchLocation: addressFound } } = await apolloClient.mutate({ mutation: SEARCH_LOCATION, variables: { location: [location.latitude, location.longitude] } });
			const normalizedAddress = sanitizeAddress({ ...addressFound, location: [location.latitude, location.longitude] });

			navigation.navigate('TypeAddressScreen', { address: normalizedAddress });


			/* navigation.dangerouslyGetParent().reset({
						index: 0,
						routes: loggedUserId
							? [{ name: 'HomeRoutes', params: { screen: 'FeedScreen' } }]
							: [{ name: 'WelcomeRoutes', params: { screen: 'AskLoginScreen' } }]
					}) */

		} catch (err) {
			Alert.alert(getErrorMessage(err));
		} finally {
			setLoadingSelect(false);
		}
	}

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
					<Button
						disabled={loadingSelect}
						color='primary'
						variant='filled'
						onPress={handleSaveAddress}
					>
						{loadingSelect
							? <LoadingBlock />
							: <Typography variant='button'>
								{!address
									? 'Continuar'
									: 'Salvar e selecionar'}
							</Typography>}
					</Button>
				</Paper>}

				<View style={{ right: 20, bottom: mapPadding + 20, position: 'absolute' }}>
					{!loadingLocation &&
					<IconButton
						icon={{ name: 'crosshairs-gps', type: 'material-community' }}
						onPress={certerUserLocation}
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