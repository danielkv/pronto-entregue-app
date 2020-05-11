import { useState, useRef, useEffect } from "react";
import { Keyboard } from "react-native";

import { useQuery } from "@apollo/react-hooks";

import { GET_SELECTED_ADDRESS } from "../graphql/addresses";
import { LOGGED_USER_ID } from "../graphql/authentication";
import { GET_SELECTED_COMPANY } from "../graphql/users";

export function useSelectedCompany() {
	const { data: { selectedCompany = null } = {} } = useQuery(GET_SELECTED_COMPANY);

	return selectedCompany;
}

export function useLoggedUserId() {
	const { data: { loggedUserId = null } = {} } = useQuery(LOGGED_USER_ID);

	return loggedUserId;
}

export function useSelectedAddress() {
	const { data: { selectedAddress = {} } = {} } = useQuery(GET_SELECTED_ADDRESS);

	return selectedAddress || {};
}

export function useKeyboardStatus(){
	const [isOpen, setIsOpen] = useState(false);
	const keyboardShowListener = useRef(null);
	const keyboardHideListener = useRef(null);
  
	useEffect(() => {
		keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () => setIsOpen(true));
		keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => setIsOpen(false));
  
		return () => {
			keyboardShowListener.current.remove();
			keyboardHideListener.current.remove();
		}
	})
  
	return isOpen;
}