import { AsyncStorage } from "react-native";

let defaultGlobalhandler = ErrorUtils.getGlobalHandler();

export default function setGlobalhandler() {
	// set new global handler
	ErrorUtils.setGlobalHandler(handleError)
}

async function handleError(err, isFatal) {
	const erroString = err.message;
	await AsyncStorage.setItem('@pronto-entregue/fatalError', erroString);
	
	// call default RN global handler
	defaultGlobalhandler(err, isFatal)
}