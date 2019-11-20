import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import {
	ModalContainer,
	ModalHeader,
	ModalClose,
	ModalTitle,
	HeaderRightContainer,
	ModalBadge,
	ModalConfirm,
	ModalContent,
} from './styles';

export default function Panel({ children, title, handleCancel, handleConfirm, badgeText, HeaderRight }) {
	const RenderHeaderRight = () => {
		if (HeaderRight) return <HeaderRight />;

		return (
			<TouchableOpacity onPress={handleConfirm}>
				<Icon name='check' color='#fff' size={30} />
			</TouchableOpacity>
		)
	}

	return (
		<ModalContainer>
			<ModalHeader>
				<ModalClose>
					<TouchableOpacity onPress={handleCancel}>
						<Icon name='close' color='#fff' size={30} />
					</TouchableOpacity>
				</ModalClose>
				<ModalTitle>{title}</ModalTitle>

				<HeaderRightContainer>
					{!!badgeText && <ModalBadge>{badgeText}</ModalBadge>}

					<ModalConfirm>
						<RenderHeaderRight />
					</ModalConfirm>
				</HeaderRightContainer>
			</ModalHeader>
			<ModalContent>
				{children}
			</ModalContent>
		</ModalContainer>
	);
}
