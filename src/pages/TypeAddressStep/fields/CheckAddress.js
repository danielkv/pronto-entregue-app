import React, { useCallback, useState } from 'react';
import { Alert, Keyboard, ActivityIndicator } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/core';
import { useFormikContext } from 'formik';
import _ from 'lodash';

import isValidAddress from '../../../helpers/address/isValidAddress';
import { Paper, Typography, Button } from '../../../react-native-ui';
import {
	FieldContainer,
	Line,
	FieldWrapper,
	HelperWrapper,
	FieldDescription,
	FieldFooter
} from './styles'

function CheckAddress({ redirect }) {
	const navigation = useNavigation();
	const { values, validateForm, handleSubmit, isSubmitting } = useFormikContext();
	const [loadingMap, setLoadingMap] = useState(false);

	useFocusEffect(useCallback(()=>{
		Keyboard.dismiss();
	}, []))

	function goToMap () {
		setLoadingMap(true);
		validateForm()
			.then((errors)=>{
				const errorsKeys = Object.keys(errors)
				if (!errorsKeys.length) return navigation.navigate('MapScreen', { address: _.cloneDeep(values), redirect });

				Alert.alert(
					'Ops, encontrei alguns erros',
					Object.values(errors).join('\n')
				)
			})
			.finally(()=>{
				setLoadingMap(false);
			})
	}

	const validAddress = isValidAddress(values);

	return (
		<FieldContainer bounces={false} keyboardDismissMode='none' keyboardShouldPersistTaps='never'>
			<Paper style={{ flex: 1, marginVertical: 0, justifyContent: 'space-between' }}>
				<FieldWrapper>
					<Typography variant='title' style={{ marginBottom: 15, fontSize: 20 }}>Verifique os dados abaixo</Typography>
					{!!values?.name && <Line variant='h4'>{values.name}</Line>}
					{!!values?.street && <Line variant='h4' style={{ fontFamily: "Roboto-Bold" }}>{`${values.street}${values.number ? `, ${values.number}` : ''}`}</Line>}
					{!!values?.complement && <Line variant='subtitle'>{values.complement}</Line>}
					{!!values?.reference && <Line variant='subtitle'>{values.reference}</Line>}
					{!!values?.district && <Line variant='subtitle'>{values.district}</Line>}
					{!!values?.city && <Line variant='subtitle'>{`${values.city} ${values.state}`}</Line>}
					{!!values?.zipcode && <Line variant='subtitle'>{values.zipcode}</Line>}

					{validAddress
						&& <Button
							icon={{ name: 'map-pin', size: 20 }}
							style={{ root: { marginTop: 20 } }}
							variant='filled'
							onPress={goToMap}
						>
							{loadingMap
								? <ActivityIndicator />
								: <Typography variant='button'>Verificar localização</Typography>}
						</Button>}
				</FieldWrapper>
				<HelperWrapper>
					<FieldDescription>Verifique todos os dados acima para que não haja problemas na entrega</FieldDescription>
				</HelperWrapper>
			</Paper>

			<FieldFooter style={{ position: 'relative', right: 0, bottom: 0 }}>
				<Button
					style={{ root: { flex: 1 }, text: { fontSize: 14 } }}
					icon={isSubmitting ? null : { name: validAddress ? 'check' : 'map-pin' }}
					variant='filled'
					disabled={isSubmitting}
					color='primary'
					onPress={handleSubmit}
				>
					{isSubmitting
						? <ActivityIndicator color='#fff' />
						: validAddress ? 'Utilizar esse endereço' : 'Vericar Localização'}
				</Button>
			</FieldFooter>
		</FieldContainer>);
}

export default CheckAddress;