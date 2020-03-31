import React, { useState } from 'react';
import { Image, Alert } from 'react-native';

import { useMutation } from '@apollo/react-hooks';
import * as Google from 'expo-google-app-auth';

import LoadingBlock from '../../../components/LoadingBlock';

import imageGoogle from '../../../assets/images/logo-google.png';
import { Button, Typography } from '../../../react-native-ui';
import { logUserIn } from '../../../services/init';
import { getErrorMessage } from '../../../utils/errors';

import { GOOGLE_LOGIN } from '../../../graphql/authentication';

export default function GoogleButtton({ disabled }) {
	const [loading, setLoading] = useState(false);

	const [googleLogin] = useMutation(GOOGLE_LOGIN)

	async function signIn() {
		setLoading(true)
		
		try {
			const result = await Google.logInAsync({
				androidClientId: "48328149169-31fusqf9oag07hb23akrfbhje89n04kd.apps.googleusercontent.com",
				//iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
				scopes: ["profile", "email"]
			})
			
			if (result.type === "success") {
				await googleLogin({ variables: { result } })
					.then(({ data: { googleLogin: { token, user } } })=>{
						logUserIn(user, token);
					})
			}
		} catch (err) {
			Alert.alert('Ops, parece que houve um erro', getErrorMessage( err))
		}
		
		setLoading(false);
	}
	
	return (
		<Button
			variant='filled'
			disabled={disabled || loading}
			onPress={signIn}
		>
			{loading
				? <LoadingBlock />
				: (
					<>
						<Image source={imageGoogle} />
						<Typography variant='button' style={{ color: '#fff' }}>Logar com Google</Typography>
					</>
				)}
		</Button>
	);
}
	