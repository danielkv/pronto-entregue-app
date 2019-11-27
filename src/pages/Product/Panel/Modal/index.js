import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Alert } from 'react-native';
import { cloneDeep } from 'lodash';
import { Input } from 'react-native-elements';

import { calculateOptionsGroupPrice, getOptionNewState } from '../../../../utils/products';
import Option from '../../Option';
import {
	SearchContainer,
	OptionsContainer
} from './styles';
import Panel from '../../../../components/Panel';

export default function modal({ optionGroup: optionGroupModal, closeModal, confirmModal }) {
	const [optionGroup, setOptionGroup] = useState(null);
	const [search, setSearch] = useState('');

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
			const optionIndex = optionGroup.options.findIndex(opt => opt.id === optionId)
			const option = cloneDeep(optionGroup.options[optionIndex]);
			option.selected = getOptionNewState(optionGroup, option);
			optionGroup.options.splice(optionIndex, 1, option);
			setOptionGroup({ ...optionGroup });
		} catch (err) {
			Alert.alert(err.message)
		}
	}, [optionGroup, setOptionGroup]);

	if (!optionGroup) return <View />

	return (
		<Panel
			title={optionGroup.name}
			handleCancel={closeModal}
			handleConfirm={()=>confirmModal(optionGroup)}
			badgeText={`R$ ${price.toFixed(2).replace('.', ',')}`}
		>
			{optionGroup.options.length >= 10 && (
				<SearchContainer>
					<Input value={search} onChangeText={(text)=>{ setSearch(text.toLowerCase()) }} placeholder='Buscar' />
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
