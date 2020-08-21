import { AsyncStorage } from "react-native";

import client from "../../services/apolloClient";

export default async function resetAddress() {
	await AsyncStorage.removeItem('@prontoEntregue/address');

	client.writeData({ data: { selectedLocation: '' } });
}