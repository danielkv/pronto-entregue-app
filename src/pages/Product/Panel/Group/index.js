import React, { useMemo } from 'react';

import { Icon, Chip, Typography } from '../../../../react-native-ui';
import theme from '../../../../theme';
import { calculateOptionsGroupPrice } from '../../../../utils/products';
import {
	Container,
	CenterElementContainer,
	TitleContainer,
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
			if (selectedOptions.length < 3)
				return (
					<Typography
						style={{ marginRight: 10, textAlign: 'right', fontSize: 13, color: '#999' }}
					>
						{selectedOptions.map(row=>row.name).join(', ')}
					</Typography>
				)

			return (
				<SelectedOptionsNumber>
					<SelectedOptionsNumberText>{selectedOptions.length}</SelectedOptionsNumberText>
				</SelectedOptionsNumber>
			);
		}

		return <Icon name='chevron-right' color={theme.palette.background.dark} size={24} />;
	}
	
	return (
		<Container onPress={onPress}>
			<TitleContainer>
				<Typography
					variant='title'
					style={{ color: '#333', fontSize: 18 }}
				>
					{group.name}
				</Typography>
			</TitleContainer>
			
			<CenterElementContainer>
				<CenterElememt />
			</CenterElementContainer>

			{!!price && (
				<Chip
					style={{ root: { height: 50, borderRadius: 25 }, text: { fontWeight: 'bold', fontSize: 14 } }}
					label={`R$ ${price.toFixed(2).replace('.', ',')}`}
					color='secondary'
				/>
			)}
		</Container>
	);
}

export default React.memo(Group);