import React, { useState } from 'react';
import { Image, Alert } from 'react-native';

import { useMutation } from '@apollo/react-hooks';
import * as Google from 'expo-google-app-auth';

import LoadingBlock from '../../../components/LoadingBlock';

import imageGoogle from '../../../assets/images/logo-google.png';
import { Button, Typography } from '../../../react-native-ui';
import { logUserIn } from '../../../services/init';
import { getErrorMessage } from '../../../utils/errors';

import { SOCIAL_LOGIN } from '../../../graphql/authentication';

export default function GoogleButtton({ disabled }) {
	const [loading, setLoading] = useState(false);

	const [socialLogin] = useMutation(SOCIAL_LOGIN)

	async function signIn() {
		setLoading(true)
		
		try {
			const result = await Google.logInAsync({
				androidClientId: "48328149169-31fusqf9oag07hb23akrfbhje89n04kd.apps.googleusercontent.com",
				iosClientId: '48328149169-an6eotcn0f18rhqjc2ibsdqrcfbbpfkm.apps.googleusercontent.com',
				scopes: ["profile", "email"]
			})
			
			if (result.type === "success") {
				const userData = {
					id: result.user.id,
					firstName: result.user.givenName,
					lastName: result.user.familyName,
					email: result.user.email,
					image: result.user.photoUrl
				}
				await socialLogin({ variables: { type: 'google', data: userData } })
					.then(({ data: { socialLogin: { token, user } } })=>{
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
	