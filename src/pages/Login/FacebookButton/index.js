import React from 'react';
import { Image } from 'react-native';

import imageFB from '../../../assets/images/logo-fb.png';
import { Button, Typography } from '../../../react-native-ui';

export default function FacebookButton({ disabled }) {
	
	return (
		<Button
			variant='filled'
			disabled={disabled}
		>
			<>
				<Image source={imageFB} style={{ marginRight: 10 }} />
				<Typography variant='button' style={{ color: '#fff' }}>Logar com Facebook</Typography>
			</>
		</Button>
	);
}
