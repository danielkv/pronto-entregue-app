import { AsyncStorage } from "react-native";

import isMinimumValidAddress from "./isMinimumValidAddress";

export default async function getLocalSavedAddress() {
	try {
		// check if has address saved
		const savedAddress = JSON.parse(await AsyncStorage.getItem('@prontoEntregue/address'));
		if (savedAddress && isMinimumValidAddress(savedAddress)) return savedAddress;

		return null;
	} catch {
		return null
	}
}