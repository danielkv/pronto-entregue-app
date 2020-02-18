import React from 'react';

import Icon from '../Icon';

export function getIcon(icon, iconColor: string = null) {
	if (typeof icon === 'string')
		return <Icon name={icon} color={iconColor} />;

	if (icon.name)
		return <Icon name={icon.name} size={icon.size} type={icon.type} color={icon.color || iconColor} />;

	if (React.isValidElement(icon))
		return icon;

	return false;
}