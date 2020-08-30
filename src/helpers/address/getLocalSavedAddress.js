import { AsyncStorage } from "react-native";

import isMinimumValidAddress from "./isMinimumValidAddress";

export default async function getLocalSavedAddress() {
	// check if has address saved
	const savedAddress = await AsyncStorage.getItem('@prontoEntregue/address');
	if (savedAddress && isMinimumValidAddress(savedAddress)) return savedAddress;

	return null;
}