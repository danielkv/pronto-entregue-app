import React from 'react';

import { useNavigation } from '@react-navigation/core';

import { Icon, useTheme, Typography } from '../../../react-native-ui';
import { ContainerButton } from './styles';

export default function MenuItem({ icon, label, selected=false, screenName }) {
	const { palette } = useTheme();
	const navigation = useNavigation();
	const iconColor = selected ? palette.primary.main : palette.background.dark;

	return (
		<ContainerButton
			onPress={()=>navigation.navigate(screenName)}
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
