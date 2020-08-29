import React from 'react';
import { Alert, Keyboard } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/core';
import { useFormikContext } from 'formik';

import { Paper, Typography, Button } from '../../../react-native-ui';
import {
	FieldContainer,
	Line,
	FieldWrapper,
	HelperWrapper,
	FieldDescription,
	FieldFooter
} from './styles'

function Checkvalues() {
	const navigation = useNavigation();
	const { values, validateForm, handleSubmit } = useFormikContext();

	useFocusEffect(()=>{
		Keyboard.dismiss();
	})

	function goToMap () {
		validateForm()
			.then((errors)=>{
				const errorsKeys = Object.keys(errors)
				if (!errorsKeys.length) navigation.navigate('MapScreen', { address: values });

				Alert.alert(
					'Ops, encontrei alguns erros',
					Object.values(errors).join('\n')
				)
			});
	}

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

					{!values?.location
						&& <Button
							icon={{ name: 'map-pin', size: 20 }}
							style={{ root: { marginTop: 20 } }}
							label='Verificar localização' variant='filled'
							onPress={goToMap}
						/>}
				</FieldWrapper>
				<HelperWrapper>
					<FieldDescription>Verifique todos os dados acima para que não haja problemas na entrega</FieldDescription>
				</HelperWrapper>
			</Paper>

			<FieldFooter>
				<Button
					style={{ root: { flex: .35, marginRight: 7 }, text: { fontSize: 14 } }}
					icon='chevron-left'
					onPress={()=>navigation.goBack()}
					variant='filled'
					color='default'
					label='Voltar'
				/>
				<Button
					style={{ root: { flex: .65 }, text: { fontSize: 14 } }}
					icon={{ name: 'check' }}
					variant='filled'
					color='primary'
					onPress={handleSubmit}
				>
					Utilizar esse endereço
				</Button>
			</FieldFooter>
		</FieldContainer>);
}

export default Checkvalues;