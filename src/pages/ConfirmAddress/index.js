import React from 'react';
import { Alert } from 'react-native';

import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { sanitizeAddress } from '../../controller/address';
import { getErrorMessage } from '../../utils/errors';
import PageForm from './form';
import { Container, ContainerScroll } from './styles';

import { SEARCH_ADDRESS } from '../../graphql/addresses';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Obrigatório'),
	street: Yup.string().required('Obrigatório'),
	number: Yup.number().typeError('Deve conter apenas números').required('Obrigatório'),
	complement: Yup.string().notRequired(),
	district: Yup.string().required('Obrigatório'),
	zipcode: Yup.number().typeError('Deve conter apenas números').required('Obrigatório'),
});

export default function ConfirmAddress() {
	const navigation = useNavigation();

	// setup search mutation
	const [searchAddress]= useMutation(SEARCH_ADDRESS, { fetchPolicy: 'no-cache' })

	function onSubmit (result) {
		const dataSave = sanitizeAddress(result);
		const search = `${dataSave.street}, ${dataSave.number}, ${dataSave.city}, ${dataSave.state}`;

		return searchAddress({ variables: { search } })
			.then(({ data: { searchAddress } })=>{
				const address = dataSave;
				if (searchAddress?.[0]?.location) address.location = searchAddress?.[0]?.location;
					
				navigation.navigate('PickLocationScreen', { address })
			})
			.catch((err)=>{
				Alert.alert('Ops, ocorreu um erro', getErrorMessage(err))
			})
	}

	// ------- END OF FUNCIONS -------

	const initialValues = __DEV__ ? {
		street: 'Rua João Quartieiro',
		number: '43',
		district: 'Centro',
		zipcode: '88960000',
		reference: 'Próximo a Ritmi',
		
		name: 'Casa',
		complement: '',
		city: 'Sombrio',
		state: 'SC',
		location: ''
	} : {
		street: '',
		number: '',
		district: '',
		zipcode: '',
		reference: '',
		
		name: '',
		complement: '',
		city: '',
		state: '',
		location: ''
	}

	return (
		
		<ContainerScroll keyboardShouldPersistTaps='handled'>
			<Container>
				<Formik
					validationSchema={validationSchema}
					initialValues={initialValues}
					onSubmit={onSubmit}
					validateOnChange={false}
					validateOnBlur={false}
					component={PageForm}
				/>
			</Container>
		</ContainerScroll>
	);
}
