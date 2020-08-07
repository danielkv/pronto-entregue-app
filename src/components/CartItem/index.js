import React from 'react';
import { Image } from 'react-native';

import calculateProductPrice from '../../helpers/calculateProductPrice';
import { useTheme, IconButton, Chip, Typography } from '../../react-native-ui';
import { BRL } from '../../utils/currency';
import {
	Container,
	ItemContent,
	ItemFooter,
	ItemMessage,
	ItemOptionsContainer,
	HeaderContainer
} from './styles';

export default function CartItem({ item, onPressDelete }) {
	const { palette } = useTheme();

	return (
		<Container>
			<Image
				source={{ uri: item.image }}
				style={{
					width: 55,
					height: 55,
					borderRadius: 30,
					resizeMode: 'cover'
				}}
			/>
			<ItemContent>
				<HeaderContainer>
					<Typography variant='title' style={{ flex: 1, fontSize: 20, color: '#333', marginBottom: 6 }}>{item.name}</Typography>
					{!!onPressDelete && (
						
						<IconButton icon={{ name: 'trash', color: palette.primary.main, size: 20 }} onPress={onPressDelete} />
						
					)}
				</HeaderContainer>
				<ItemOptionsContainer>
					{item.optionsGroups.map((group, index) => {
						return (
							<Typography style={{ fontFamily: 'Roboto-Bold' }} key={index}>
								{`${group.name}: `}
								<Typography>
									{group.options.map(option=>option.name).join(', ')}
								</Typography>
							</Typography>
						)
					})}
				</ItemOptionsContainer>
				{!!item.message && <ItemMessage>{`Obs.: ${item.message}`}</ItemMessage>}
				<ItemFooter>
					<Chip
						color='secondary'
						style={{ root: { height: 30, paddingHorizontal: 10 }, text: { fontSize: 14, color: palette.background.dark, fontFamily: 'Roboto-Bold' } }}
						label={BRL(calculateProductPrice(item, false)*item.quantity).format()} />
					<Typography style={{ marginLeft: 10, color: palette.background.dark }}>{`Qtde: ${item.quantity}`}</Typography>
				</ItemFooter>
			</ItemContent>
		</Container>
	);
}
