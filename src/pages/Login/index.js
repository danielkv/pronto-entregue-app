import React from 'react';
import { Alert, ActivityIndicator, Platform, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useMutation } from '@apollo/react-hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Device from 'expo-device';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import BigHeader from '../../components/BigHeader';

import LoginIllustration from '../../assets/images/login-ill.png';
import getUserLastOrderAddress from '../../helpers/address/getUserClosestAddress';
import logUserIn from '../../helpers/auth/logUserIn';
import { TextField, Button } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import FacebookButton from './FacebookButton';
import GoogleButtton from './GoogleButtton';
import { FormContainer, InputsContainer, ButtonsContainer } from './styles';

import { SET_SELECTED_ADDRESS } from '../../graphql/addresses'
import { LOGIN } from '../../graphql/authentication';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email inválido')
		.required('Obrigatório'),
	password: Yup.string()
		.required('Obrigatório'),
});

const initialValues = {
	email: '',
	password: '',
}

export default function Login() {
	const { params: { redirect = null, redirectParams = {} } = {} } = useRoute();
	const navigation = useNavigation();
	const scrollY = new Animated.Value(0);

	const [setSelectedAddress] = useMutation(SET_SELECTED_ADDRESS);
	
	// Setup GQL Mutation
	const [login] = useMutation(LOGIN);

	const refs = {}
	const handleNextInput = (fieldName) => () => {
		refs[fieldName].focus();
	}
	
	const caretHidden = Device.brand === 'Xiaomi';
	
	function onSubmit({ email, password }, { resetForm }) {
		return login({ variables: { email, password } })
			.then(async ({ data })=>{
				resetForm();
				const { user, token } = data.login;

				await logUserIn(user, token);
				return afterLogin(user);
			})
			.catch(err => {
				Alert.alert(
					'Ops! Ocorreu um erro.',
					getErrorMessage(err)
				);
			})
	}

	async function afterLogin(user) {
		const userAddress = await getUserLastOrderAddress(user);
		if (!userAddress) {
			return navigation.dangerouslyGetParent().reset({
				index: 0,
				routes: [{ name: 'AddressRoutes', params: { screen: 'SelectAddressScreen' } }]
			});
		} else {
			await setSelectedAddress({ variables: { address: userAddress } })
		}

		if (redirect)
			return navigation.dangerouslyGetParent().replace(redirect, redirectParams);
		else
			return navigation.dangerouslyGetParent().reset({
				index: 0,
				routes: [{ name: 'HomeRoutes', params: { screen: 'FeedScreen' } }]
			});
	}

	// eslint-disable-next-line no-shadow
	const { values: { email, password }, errors, handleSubmit, handleChange, handleBlur, isSubmitting } = useFormik({
		initialValues,
		validationSchema,
		validateOnBlur: false,
		onSubmit,
	});

	return (
		<View style={{ flex: 1 }}>
			<Animated.ScrollView
				scrollEventThrottle={16}
				style={{ flex: 1 }}
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{ paddingBottom: 50, paddingTop: 210 }}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
			>
				<FormContainer>
					<InputsContainer>
						<TextField
							caretHidden={caretHidden}
							label='Email'
							autoFocus
							keyboardType='email-address'
							autoCapitalize='none'
							autoCompleteType='email'
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							disabled={isSubmitting }
							value={email}

							error={Boolean(errors.email)}
							helperText={errors.email || ''}

							blurOnSubmit={false}
							returnKeyType='next'
							onSubmitEditing={handleNextInput('password')}
						/>
						<TextField
							secureTextEntry
							autoCompleteType='password'
							label='Senha'
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							disabled={isSubmitting}
							value={password}

							helperText={errors.password || ''}
							error={Boolean(errors.password)}
								
							inputRef={ref => { refs.password = ref }}
							onSubmitEditing={handleSubmit}
						/>
					</InputsContainer>
					<ButtonsContainer>
						<Button
							color='primary'
							variant='filled'
							type='outline'
							onPress={handleSubmit}
							disabled={isSubmitting}
							loading={isSubmitting}
							containerStyle={{ borderRadius: 25 }}
						>
							{isSubmitting
								? <ActivityIndicator />
								: 'Entrar'}
						</Button>
						<Button
							variant='outlined'
							onPress={() => navigation.navigate('SubscriptionScreen')}
							disabled={isSubmitting}
							label='Quero me cadastrar'
						/>
						<Button
							disabled={isSubmitting}
							onPress={() => navigation.navigate('ForgotPasswordScreen')}
							label='Esqueci minha senha'
						/>
						{Platform.OS !== 'ios' && (
							<>
								<GoogleButtton afterLogin={afterLogin} disabled={isSubmitting} />
								<FacebookButton afterLogin={afterLogin} disabled={isSubmitting} />
							</>
						)}
					</ButtonsContainer>
				</FormContainer>

			</Animated.ScrollView>
			<BigHeader title='Fazer login' image={LoginIllustration} scrollY={scrollY} />
		</View>
	);
}
