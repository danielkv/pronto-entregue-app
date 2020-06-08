import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native'

import { BarCodeScanner } from 'expo-barcode-scanner';

import { Button } from '../../../react-native-ui';

// import { Container } from './styles';

export default function BarCodeButton({ setScanningCode, scanningCode, handlePressApplyCoupon }) {
	const [hasPermission, setHasPermission] = useState(null);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	function handleBarCodeScanned ({ data }) {
		setScanningCode(false);
		const regExp = /^ProntoEntregue_Cupom\[(.+)\]$/m;
		const match = data.match(regExp);

		if (!match || !match[1]) return Alert.alert(
			'Cupom inválido',
			'Esse QR code não é um Cupom válido')

		handlePressApplyCoupon(match[1]);
	}

	if (!hasPermission) return false;

	return (
		<>
			<Button
				icon={{ name: 'qrcode', type: 'material-community' }}
				onPress={()=>setScanningCode(!scanningCode)}
			>
				Ler QR Code
			</Button>

			{scanningCode && <BarCodeScanner
				onBarCodeScanned={handleBarCodeScanned}
				style={{ width: '100%', height: 300, padding: 0 }}
			/>}
		</>
	);
}