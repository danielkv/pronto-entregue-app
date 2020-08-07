import React, { useMemo } from 'react';

import calculateOptionsGroupPrice from '../../../../helpers/calculateOptionsGroupPrice';
import { Icon, Chip, Typography } from '../../../../react-native-ui';
import theme from '../../../../theme';
import { BRL } from '../../../../utils/currency';
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
	}, [selectedOptions]);
	
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
					style={{ color: '#333', fontSize: 17 }}
				>
					{group.name}
				</Typography>
			</TitleContainer>
			
			<CenterElementContainer>
				<CenterElememt />
			</CenterElementContainer>

			{!!price && (
				<Chip
					style={{ root: { height: 44, borderRadius: 25, paddingHorizontal: 12 }, text: { fontSize: 13 } }}
					label={BRL(price).format()}
					color='secondary'
				/>
			)}
		</Container>
	);
}

export default React.memo(Group);