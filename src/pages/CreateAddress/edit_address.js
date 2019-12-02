import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Toast from 'react-native-simple-toast';
import { Formik } from 'formik';
import * as Yup from 'yup';

import PageForm from './form';
import { getErrors } from '../../utils/errors';
import { UPDATE_USER_ADDRESS, LOAD_USER_ADDRESS } from '../../graphql/users';
import LoadingBlock from '../../components/LoadingBlock';
import ErrorBlock from '../../components/ErrorBlock';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Obrigatório'),
	street: Yup.string().required('Obrigatório'),
	number: Yup.number().typeError('Deve conter apenas números').required('Obrigatório'),
	complement: Yup.string().notRequired(),
	district: Yup.string().required('Obrigatório'),
	city: Yup.string().required('Obrigatório'),
	state: Yup.string().required('Obrigatório'),
	zipcode: Yup.number().typeError('Deve conter apenas números').required('Obrigatório'),
});

export default function EditAddress({ address_id }) {
	const navigation = useNavigation();

	useEffect(()=>{
		navigation.setParams({
			headerTitle: 'Alterar endereço'
		});
	}, []);
	
	const {
		data: loadAddressData,
		loading: loadingAddress,
		error: errorLoadAddress,
	} = useQuery(LOAD_USER_ADDRESS, { variables: { id: address_id } });

	const [updateAddress] = useMutation(UPDATE_USER_ADDRESS, { variables: { id: address_id } });
	
	const onSubmit = async (data, { resetForm }) => {
		const dataSave = {
			...data,
			zipcode: parseInt(data.zipcode, 10),
		}
		
		await updateAddress({ variables: { data: dataSave } })
			.then(() => {
				resetForm();

				Toast.show('Endereço alterado');
				navigation.navigate('AddressListScreen');
			})
			.catch(err => {
				Alert.alert(getErrors(err));
			});
	}

	// ------- END OF FUNCIONS -------

	if (loadingAddress) return <LoadingBlock />;
	if (errorLoadAddress) return <ErrorBlock error={errorLoadAddress} />;

	const initialValues = {
		name: loadAddressData.userAddress.name,
		street: loadAddressData.userAddress.street,
		number: loadAddressData.userAddress.number,
		complement: loadAddressData.userAddress.complement,
		district: loadAddressData.userAddress.district,
		city: loadAddressData.userAddress.city,
		state: loadAddressData.userAddress.state,
		zipcode: loadAddressData.userAddress.zipcode.toString(),
	}

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={initialValues}
			onSubmit={onSubmit}
			validateOnChange={false}
			validateOnBlur={false}
			component={PageForm}
		/>
	);
}
