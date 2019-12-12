import React, { useMemo } from 'react';
import { Icon } from 'react-native-elements';

import { calculateOptionsGroupPrice } from '../../../../utils/products';
import theme from '../../../../theme';
import {
	Container,
	GroupPrice,
	PriceContainer,
	CenterElementContainer,
	GroupTitle,
	TitleContainer,
	SelectedOptionsText,
	SelectedOptionsNumber,
	SelectedOptionsNumberText
} from './styles';

function Group({ onPress, group }) {
	const selectedOptions = group.options.filter(opt => opt.selected);

	const price = useMemo(() => {
		return calculateOptionsGroupPrice(group);
	}, [selectedOptions, calculateOptionsGroupPrice]);
	
	const CenterElememt = () => {
		if (selectedOptions.length >= 1) {
			if (selectedOptions.length < 3) return <SelectedOptionsText>{selectedOptions.map(row=>row.name).join(', ')}</SelectedOptionsText>;
			return (
				<SelectedOptionsNumber>
					<SelectedOptionsNumberText>{selectedOptions.length}</SelectedOptionsNumberText>
				</SelectedOptionsNumber>
			);
		}

		return <Icon name='keyboard-arrow-right' color={theme.colors.primary} size={24} />;
	}
	
	return (
		<Container onPress={onPress}>
			<TitleContainer>
				<GroupTitle>{group.name}</GroupTitle>
			</TitleContainer>
			
			<CenterElementContainer>
				<CenterElememt />
			</CenterElementContainer>

			{!!price && (
				<PriceContainer>
					<GroupPrice>{`R$ ${price.toFixed(2).replace('.', ',')}`}</GroupPrice>
				</PriceContainer>
			)}
		</Container>
	);
}

export default React.memo(Group);