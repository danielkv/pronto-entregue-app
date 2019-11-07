import React, { useCallback, useState } from 'react';
import { vw } from 'react-native-expo-viewport-units';
import Modal from 'react-native-modal';

import Group from './group';
import { Container } from './styles';
import GroupModal from './modal';

function Panel({ optionsGroups, onItemSelect }) {
	const [selectedOptionGroupIndex, setSelectedOptionGroupIndex] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const handlePressGroup = useCallback((groupIndex) => () => {
		setModalOpen(true);
		setSelectedOptionGroupIndex(groupIndex);
	}, [optionsGroups]);

	const handleCloseModal = () => {
		setModalOpen(false);
	}

	const handleConfirmModal = useCallback((newOptionGroup) => {
		optionsGroups[selectedOptionGroupIndex] = newOptionGroup;
		onItemSelect(optionsGroups);
		handleCloseModal();
	}, [optionsGroups, selectedOptionGroupIndex]);

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
				onModalHide={()=>setSelectedOptionGroupIndex(null)}
				onSwipeComplete={handleCloseModal}
				onBackButtonPress={handleCloseModal}
				onBackdropPress={handleCloseModal}
				animationIn='slideInRight'
				animationOut='slideOutRight'
				style={{ marginLeft: vw(10), marginRight: 0, marginVertical: 0 }}
				swipeDirection='right'
			>
				<GroupModal optionGroup={optionsGroups[selectedOptionGroupIndex]} confirmModal={handleConfirmModal} closeModal={handleCloseModal} />
			</Modal>
		</Container>
	);
}

export default Panel;