import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Alert } from 'react-native';


import { cloneDeep } from 'lodash';

import Panel from '../../../../components/Panel';

import { calculateOptionsGroupPrice, getGroupNewState } from '../../../../controller/products';
import { TextField, useTheme } from '../../../../react-native-ui';
import { BRL } from '../../../../utils/currency';
import Option from '../../Option';
import {
	SearchContainer,
	OptionsContainer
} from './styles';

export default function Modal({ optionGroup: optionGroupModal, closeModal, confirmModal }) {
	const [optionGroup, setOptionGroup] = useState(null);
	const [search, setSearch] = useState('');
	const { palette } = useTheme();

	useEffect(()=>{
		return () => {
			setOptionGroup(null);
			setSearch('');
		}
	}, []);

	useEffect(()=>{
		if (optionGroupModal) setOptionGroup(cloneDeep(optionGroupModal));
	}, [optionGroupModal]);

	const price = useMemo(()=>{
		return calculateOptionsGroupPrice(optionGroup);
	}, [optionGroup, calculateOptionsGroupPrice]);

	const handlePressOption = useCallback((optionId) => () => {
		try {
			const optionIndex = optionGroup.options.findIndex(opt => optionId === opt.id);
			const newState = getGroupNewState(optionGroup, optionIndex)
			
			setOptionGroup(newState);
		} catch (err) {
			Alert.alert('Opa! Acho que você não pode fazer isso', err.message)
		}
	}, [optionGroup, setOptionGroup]);

	if (!optionGroup) return <View />

	return (
		<Panel
			title={optionGroup.name}
			handleCancel={closeModal}
			handleConfirm={()=>confirmModal(optionGroup)}
			badgeText={BRL(price).format()}
		>
			{optionGroup.options.length >= 10 && (
				<SearchContainer>
					<TextField
						label='Buscar'
						style={{ inputContainer: { backgroundColor: palette.background.main } }}
						placeholderTextColor='#D1C6B1'
						value={search}
						onChangeText={(text)=>{ setSearch(text.toLowerCase()) }}
					/>
				</SearchContainer>
			)}
			<OptionsContainer>
				{optionGroup.options.filter(opt=>opt.name.toLowerCase().search(search) !== -1).map((option, optionIndex)=>(
					<Option
						key={optionIndex}
						option={option}
						type={optionGroup.type}
						onPress={handlePressOption(option.id)}
					/>
				))}
			</OptionsContainer>
		</Panel>
	);
}
