import * as Location from 'expo-location';

export default async function getLocation() {
	// checks if app has permission to access location
	const { status } = await Location.requestPermissionsAsync();
	if (status !== 'granted') throw new Error('A permissão para acessar a localização foi negada')

	// checks if user has location enabled
	const locationEnabled = await Location.hasServicesEnabledAsync();
	if (!locationEnabled) throw new Error('Sua localização não está ativa, ative-a para buscarmos o endereço mais próximo de você.')

	// get current location
	const location = await Location.getCurrentPositionAsync({
		enableHighAccuracy: true,
		accuracy: Location.Accuracy.Highest
	})

	return location;
}