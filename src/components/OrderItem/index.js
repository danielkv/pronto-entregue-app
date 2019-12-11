import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import {
	Container,
	ButtonsContainer,
	ItemContent,
	ItemFooter,
	ItemTitle,
	ItemMessage,
	ItemOptionsContainer,
	ItemOptionTitle,
	ItemOptionDesc,
	ItemQuantity,
	ItemPrice,
	ItemPriceContainer,
} from './styles';

export default function CartItem({ item, onPressDelete }) {
	return (
		<Container>
			<ItemContent>
				<ItemTitle>{item.name}</ItemTitle>
				<ItemOptionsContainer>
					{item.options_groups.map((group, index) => {
						return (
							<ItemOptionTitle key={index}>
								{`${group.name}: `}
								<ItemOptionDesc>
									{group.options.map(option=>option.name).join(', ')}
								</ItemOptionDesc>
							</ItemOptionTitle>
						)
					})}
				</ItemOptionsContainer>
				{!!item.message && <ItemMessage>{`Obs.: ${item.message}`}</ItemMessage>}
			</ItemContent>
			<ItemFooter>
				<ItemQuantity>{`Qtde: ${item.quantity}`}</ItemQuantity>
				<ItemPriceContainer><ItemPrice>{`R$ ${item.price.toFixed(2).replace('.', ',')}`}</ItemPrice></ItemPriceContainer>
			</ItemFooter>
			
			{!!onPressDelete && (
				<ButtonsContainer>
					<TouchableOpacity onPress={onPressDelete}>
						<Icon type='material-community' name='delete' color='#fff' />
					</TouchableOpacity>
				</ButtonsContainer>
			)}
		</Container>
	);
}
