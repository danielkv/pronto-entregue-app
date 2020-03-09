import React from 'react';

import { Icon, useTheme, Typography } from '../../../react-native-ui';
import { ContainerButton } from './styles';

export default function MenuItem({ icon, label, selected=false, onPress }) {
	const { palette } = useTheme();
	const iconColor = selected ? palette.primary.main : palette.background.dark;

	return (
		<ContainerButton
			onPress={onPress}
			selected={selected}
			underlayColor={palette.primary.main}
		>
			<>
				<Icon name={icon} color={iconColor} size={20} />
				<Typography style={{ textAlign: 'center', fontSize: 12, color: iconColor }}>{label}</Typography>
			</>
		</ContainerButton>
	);
}
