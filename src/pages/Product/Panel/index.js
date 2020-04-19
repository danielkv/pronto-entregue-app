import React, { useCallback, useState } from 'react';
import { Platform, Alert } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import Modal from 'react-native-modal';
import { useSafeArea } from 'react-native-safe-area-context';

import { getGroupRestrainingRules } from '../../../controller/products';
import Group from './Group';
import GroupModal from './Modal';
import { Container } from './styles';

function Panel({ optionsGroups, onItemSelect }) {
	const [selectedOptionGroup, setSelectedOptionGroup] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const insets = useSafeArea();

	const modalMarginTop = Platform.OS === 'android' ? 0 : insets.top;
	const modalMarginBottom = Platform.OS === 'android' ? 0 : insets.bottom;

	const handlePressGroup = useCallback((groupIndex) => () => {
		try {
			const group = getGroupRestrainingRules(optionsGroups, optionsGroups[groupIndex]);

			setModalOpen(true);
			setSelectedOptionGroup(group);
		} catch (err) {
			Alert.alert(err.message);
		}
	}, [optionsGroups]);

	const handleCloseModal = () => {
		setModalOpen(false);
	}

	const handleConfirmModal = useCallback((newOptionGroup) => {
		const groupIndex = optionsGroups.findIndex(group=>group.id === newOptionGroup.id);
		optionsGroups[groupIndex] = newOptionGroup;
		onItemSelect(optionsGroups);
		handleCloseModal();
	}, [optionsGroups]);

	return (
		<Container>
			{optionsGroups.map((group, groupIndex)=>(
				<Group
					key={groupIndex}
					group={group}
					onPress={handlePressGroup(groupIndex)}
				/>
			))}
			<Modal
				isVisible={modalOpen}
				onModalHide={()=>setSelectedOptionGroup(null)}
				onSwipeComplete={handleCloseModal}
				onBackButtonPress={handleCloseModal}
				onBackdropPress={handleCloseModal}
				animationIn='slideInRight'
				animationOut='slideOutRight'
				style={{ marginLeft: vw(10), marginRight: 0, marginTop: modalMarginTop, marginBottom: modalMarginBottom }}
				swipeDirection='right'
				propagateSwipe
			>
				<GroupModal optionGroup={selectedOptionGroup} confirmModal={handleConfirmModal} closeModal={handleCloseModal} />
			</Modal>
		</Container>
	);
}

export default Panel;