import React from 'react';

import { Icon } from '../../../react-native-ui';
import {
	Block,
	BlockIcon,
	BlockHeader,
	BlockTitle,
	BlockFooter,
	BlockInfo,
} from './styles';

export default function BlockComponent({ title, info1, info2, icon, color, ...props }) {
	return (
		<Block {...{ color, ...props }} >
			<BlockHeader>
				{Boolean(icon !== undefined) && <BlockIcon><Icon {...icon} /></BlockIcon>}
				<BlockTitle {...{ color }}>{title}</BlockTitle>
			</BlockHeader>
			<BlockFooter>
				{Boolean(info2 !== undefined) && <BlockInfo {...{ color }} style={{ fontFamily: 'Roboto', fontSize: 14 }}>{info2}</BlockInfo>}

				{Boolean(info1 !== undefined) && <BlockInfo {...{ color }}>{info1}</BlockInfo>}
			</BlockFooter>
		</Block>
	);
}
