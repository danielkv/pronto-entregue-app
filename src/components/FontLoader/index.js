import React, { useEffect, useState } from 'react';

import * as Font from 'expo-font';

import LoadingBlock from '../LoadingBlock';

// import { Container } from './styles';

export default function FontLoader({ children }) {
	const [loading, setLoading] = useState(true);

	useEffect(()=>{
		Font.loadAsync({
			'Roboto': require('../../assets/fonts/Roboto-Regular.ttf')
		})
			.then(()=> {
				setLoading(false)
			})
	})

	if (loading) return <LoadingBlock />;
	
	return children;
}
