import React from 'react';

import { IconButton, Chip, Typography } from '../../react-native-ui';
import {
	ModalContainer,
	ModalHeader,
	ModalClose,
	HeaderRightContainer,
	ModalConfirm,
	ModalContent,
	ModalBadgeContainer,
} from './styles';

export default function Panel({ children, title, handleCancel, handleConfirm, badgeText, HeaderRight }) {
	const RenderHeaderRight = () => {
		if (HeaderRight) return <HeaderRight />;

		return <IconButton icon={{ name: 'check', size: 30 }} onPress={handleConfirm} />;
	}

	return (
		<ModalContainer>
			<ModalHeader>
				<ModalClose>
					<IconButton icon={{ name: 'x' }} onPress={handleCancel} />
				</ModalClose>
				<Typography variant='title' style={{ color: '#333', fontSize: 18 }}>{title}</Typography>

				<HeaderRightContainer>
					{!!badgeText
						&&	(
							<ModalBadgeContainer>
								<Chip
									style={{ root: { height: 24, paddingHorizontal: 10 }, text: { fontSize: 13 } }}
									label={badgeText}
								/>
							</ModalBadgeContainer>
						)}

					<ModalConfirm>
						<RenderHeaderRight />
					</ModalConfirm>
				</HeaderRightContainer>
			</ModalHeader>
			<ModalContent keyboardShouldPersistTaps='handled'>
				{children}
			</ModalContent>
		</ModalContainer>
	);
}
