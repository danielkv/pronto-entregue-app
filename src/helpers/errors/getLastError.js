import { AsyncStorage, Alert } from "react-native";

export default async function getLastError() {
	// checks if occured an error
	const errorString = await AsyncStorage.getItem('@pronto-entregue/fatalError');
	if (!errorString) return;

	// display error
	Alert.alert('O app fechou devido a um erro inesperado', errorString);

	AsyncStorage.removeItem('@pronto-entregue/fatalError');
}