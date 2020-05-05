import React from 'react';
import { Alert, ScrollView, View } from 'react-native';

import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Typography } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import SeggestionForm from './form';

import { SUGGEST_COMPANY } from '../../graphql/companies';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Obrigatório'),
	email: Yup.string().email('Email inválido').required('Obrigatório'),
	companyName: Yup.string().required('Obrigatório'),
	companyContact: Yup.string().notRequired(),
	companyPhone: Yup.string().notRequired(),
	companyEmail: Yup.string().email().notRequired(),
	message: Yup.string().notRequired(),
});

export default function SuggestCompany() {
	const navigation = useNavigation();

	const initialValues = {
		name: '',
		email: '',
		companyName: '',
		companyContact: '',
		companyPhone: '',
		companyEmail: '',
		message: '',
	}

	const [suggestCompany] = useMutation(SUGGEST_COMPANY);

	function onSubmit (result, { resetForm }) {
		return suggestCompany({ variables: { data: result } })
			.then(() => {
				resetForm();
				Alert.alert(
					'Muito Obrigado!',
					`Sua indicação foi feita. Vamos tentar o contato com ${result.companyName} o mais rápido possível.`,
					[{ text: 'Ok', onPress: () => navigation.navigate('FeedScreen') }],
				);
			})
			.catch(err => {
				Alert.alert(getErrorMessage(err));
			});
	}

	return (
		<ScrollView>
			<View style={{ marginHorizontal: 35, marginBottom: 35 }}>
				<Typography variant='h1' style={{ marginBottom: 25 }}>Indique um estabelecimento</Typography>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					validateOnBlur={false}
					onSubmit={onSubmit}
					component={(props)=><SeggestionForm privacyPolicy={true} {...props} />}
				/>
			</View>
		</ScrollView>
	);
}