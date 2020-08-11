import React from 'react';
import { View } from 'react-native';

import { IconButton, Chip, Typography, Button } from '../../react-native-ui';
import {
	ModalContainer,
	ModalHeader,
	ModalClose,
	HeaderRightContainer,
	ModalConfirm,
	ModalContent,
	ModalBadgeContainer,
} from './styles';

export default function Panel({ children, title, handleCancel, handleConfirm, badgeText, HeaderRight, confirmButton=true }) {
	const RenderHeaderRight = () => {
		if (HeaderRight) return <HeaderRight />;

		return false;
		//return <IconButton style={{ button: { backgroundColor: palette.primary.main } }} icon={{ name: 'check', size: 30, color: '#fff' }} onPress={handleConfirm} />;
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
			{confirmButton && <View style={{ paddingHorizontal: 20, marginBottom: 10, marginTop: 10 }}>
				<Button
					label='Confirmar'
					color='primary'
					variant='filled'
					icon='check'
					onPress={handleConfirm}
					style={{
						text: { fontSize: 14 },
						button: { height: 45 }
					}}
				/>
			</View>}
		</ModalContainer>
	);
}
