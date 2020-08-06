import React, { useState, useEffect } from 'react';
import { View, Alert, Platform, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'

import { useApolloClient, useQuery } from '@apollo/react-hooks';
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment';

import { Typography, FormHelperText, Button, Chip, Icon } from '../../../react-native-ui';

import { GET_CART } from '../../../graphql/cart';

function Scheduler ({ schedulableProducts, company }) {
	const [availableHours, setAvailableHours] = useState(null)
	const [scheduled, setScheduled] = useState(()=>getMinumumDate().toDate())
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);
	const client = useApolloClient()

	const { data: { cartScheduled } } = useQuery(GET_CART);

	useEffect(()=>{
		setCartScheduled(getMinumumDate())
	}, [])

	function setCartScheduled(datetime) {
		client.writeData({ data: { cartScheduled: moment(datetime).valueOf() } })
	}

	function getMinumumDate() {
		const minDeliveryTime = schedulableProducts[0].minDeliveryTime;
		const minDeliveryTimeMoment = moment().add(minDeliveryTime, 'minutes');
		let availableHours;
		while (!availableHours) {
			availableHours = getAvailableHours(minDeliveryTimeMoment)
			if (!availableHours) minDeliveryTimeMoment.add(1, 'day');
		}

		minDeliveryTimeMoment.set(breakTimeString(availableHours[0]))

		return minDeliveryTimeMoment;
	}

	function breakTimeString(time) {
		const splitted = time.from.split(':');
		return { hour: splitted[0], minute: splitted[1] }
	}

	function getAvailableHours(date) {
		const dayOfWeek = moment(date).format('d');
		const availableDays = company.scheduleConfigs.deliveryHoursEnabled ? company.scheduleConfigs.deliveryHours : company.scheduleConfigs.businessHours;
		return availableDays[dayOfWeek].hours;
	}

	function handleOpenTimePicker(date) {
		const hours = getAvailableHours(date)
		if (!hours || !hours.length) {
			Alert.alert(
				'Selecione outro dia da semana',
				`${company.displayName} não faz entregas nesse dia da semana`,
				[
					{ text: 'OK', onClick: ()=>handleOpenDatePicker() }
				]
			)
		} else {
			setAvailableHours(hours)
			setShowTimePicker(true);
		}
	}

	function handleHideTimePicker() {
		//setScheduled(latestDateTime);
		setShowTimePicker(false);
	}

	function handleOpenDatePicker() {
		setShowDatePicker(true);
	}
	
	function handleHideDatePicker() {
		//setScheduled(latestDateTime);
		setShowDatePicker(false);
	}

	function handleSelectTime(time) {
		const finalDateTime = moment(scheduled).set(breakTimeString(time)).toDate()
		setScheduled(finalDateTime);
		handleConfirmTimePicker(finalDateTime);
	}

	function handleConfirmTimePicker(datetime) {
		setShowTimePicker(false);
		setCartScheduled(datetime);
	}

	function handleConfirmDatePicker(date) {
		if (showDatePicker) setShowDatePicker(false)
		if (scheduled) setTimeout(()=>handleOpenTimePicker(date), 400)
	}

	function onChangeDate(e, date) {
		if (Platform.OS === 'android' && e.type !== 'set') {
			setShowDatePicker(false);
		} else {
			setShowDatePicker(Platform.OS === 'ios');
			setScheduled(date);
			if (Platform.OS === 'android') handleConfirmDatePicker(date);
		}
	}

	return <View>
		<View style={{ flexDirection: 'row', marginBottom: 10 }}>
			<Chip
				label={moment(cartScheduled).format('ddd DD/MM [~]HH:mm')}
				style={{ root: { backgroundColor: 'white', height: 40, flex: 1, marginRight: 6 }, text: { fontSize: 14, color: '#333' } }}
			/>
			<Button
				label={`Alterar data e hora`}
				style={{ root: { marginVertical: 0 }, button: { height: 40 }, text: { fontSize: 12 } }}
				color='primary'
				variant='filled'
				onPress={handleOpenDatePicker}
			/>
		</View>
		{Platform.OS === 'android'
			? (showDatePicker && (
				<DateTimePicker
					value={scheduled}
					mode='date'
					is24Hour={true}
					display='default'
					onChange={onChangeDate}
				/>)
			)
			: (
				<Modal
					isVisible={showDatePicker}
					onBackButtonPress={handleHideDatePicker}
					onBackdropPress={handleHideDatePicker}
					onSwipeComplete={handleHideDatePicker}
					style={{ margin: 0, justifyContent: 'flex-end' }}
				>
					<View
						style={{
							backgroundColor: '#fff',
							justifyContent: 'flex-end',
							borderTopRightRadius: 30,
							borderTopLeftRadius: 30
						}}
					>
						<View style={{ marginHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
							<Button onPress={handleHideDatePicker}>Cancelar</Button>
							<Button onPress={()=>handleConfirmDatePicker(scheduled)}>OK</Button>
						</View>
						<DateTimePicker
							testID='dateTimePicker'
							value={scheduled}
							mode='date'
							is24Hour={true}
							display='default'
							onChange={onChangeDate}
						/>
					</View>
				</Modal>
			)}
		<Modal
			isVisible={showTimePicker}
			onModalHide={handleHideTimePicker}
			onBackButtonPress={handleHideTimePicker}
			onBackdropPress={handleHideTimePicker}
			onSwipeComplete={handleHideTimePicker}
			style={{ margin: 0, justifyContent: 'flex-end' }}
		>
			<View
				style={{
					backgroundColor: '#fff',
					justifyContent: 'flex-end',
					borderTopRightRadius: 30,
					borderTopLeftRadius: 30,
					padding: 35
				}}
			>
				<Typography style={{ textAlign: 'center' }} variant='title'>Selecione um horário</Typography>
				<FormHelperText style={{ text: { textAlign: 'center' } }} color='default'>Esse é um horário aproximado</FormHelperText>
				<View style={{ marginVertical: 15 }}>
					{Boolean(availableHours) && availableHours.map((hour, index) =>
						<View key={index}>
							<TouchableOpacity
								onPress={()=>handleSelectTime(hour)}
							
								style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15, backgroundColor: '#f0f0f0', borderRadius: 6 }}
							>
								<Icon name='clock' />
								<Typography style={{ fontSize: 16, fontFamily: 'Roboto-Bold' }}>{`${hour.from} ~ ${hour.to}`}</Typography>
							</TouchableOpacity>
						</View>
					)}
				</View>
				<Button
					variant='outlined'
					onPress={handleHideTimePicker}
				>
					Cancelar
				</Button>
			</View>
		</Modal>
	</View>;
}

export default Scheduler;