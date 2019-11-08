import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import Modal from 'react-native-modal';

import { getGroupRestrainingRules } from '../../../utils/products';
import Group from './group';
import { Container } from './styles';
import GroupModal from './modal';

function Panel({ optionsGroups, onItemSelect }) {
	const [selectedOptionGroup, setSelectedOptionGroup] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

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
				style={{ marginLeft: vw(10), marginRight: 0, marginVertical: 0 }}
				swipeDirection='right'
			>
				<GroupModal optionGroup={selectedOptionGroup} confirmModal={handleConfirmModal} closeModal={handleCloseModal} />
			</Modal>
		</Container>
	);
}

export default Panel;