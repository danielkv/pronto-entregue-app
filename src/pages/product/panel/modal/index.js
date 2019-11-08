import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TouchableOpacity, View, Alert } from 'react-native';
import { cloneDeep } from 'lodash';
import { Icon, Input } from 'react-native-elements';

import { calculateOptionsGroupPrice, getOptionNewState } from '../../../../utils/products';
import Option from '../../option';
import {
	ModalContainer,
	ModalHeader,
	ModalClose,
	ModalTitle,
	ModalPrice,
	ModalConfirm,
	ModalContent,
	SearchContainer,
	OptionsContainer
} from './styles';

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

	const handlePressOption = useCallback((optionIndex) => () => {
		try {
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
		<ModalContainer>
			<ModalHeader>
				<ModalClose>
					<TouchableOpacity onPress={closeModal}>
						<Icon name='close' color='#fff' size={30} />
					</TouchableOpacity>
				</ModalClose>
				<ModalTitle>{optionGroup.name}</ModalTitle>
				<ModalPrice>{`R$ ${parseFloat(price).toFixed(2).replace('.', ',')}`}</ModalPrice>
				<ModalConfirm>
					<TouchableOpacity onPress={()=>confirmModal(optionGroup)}>
						<Icon name='check' color='#fff' size={30} />
					</TouchableOpacity>
				</ModalConfirm>
			</ModalHeader>
			<ModalContent>
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
							onPress={handlePressOption(optionIndex)}
						/>
					))}
				</OptionsContainer>
			</ModalContent>
		</ModalContainer>
	);
}
