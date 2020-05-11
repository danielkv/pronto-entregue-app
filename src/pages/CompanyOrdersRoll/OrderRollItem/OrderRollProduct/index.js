import React from 'react'
import { View } from 'react-native'

import { Typography } from '../../../../react-native-ui'

export default function OrderRollProduct({ product }) {
	return (
		<View key={product.id}>
			<View style={{ marginBottom: 6 }}>
				<Typography style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>
					{product.name}
					{Boolean(product.productRelated.sku) && <Typography style={{ marginLeft: 10 }} variant='caption'>{`#${product.productRelated.sku}`}</Typography>}
				</Typography>
				
			</View>
			<View style={{ marginLeft: 15 }}>
				<Typography style={{ fontSize: 14, fontFamily: 'Roboto-Bold' }}>
					Quantidade: <Typography>{product.quantity}</Typography>
				</Typography>
			
				<View>
					{product.optionsGroups.map(group => (
						<View key={group.id}>
							<Typography style={{ fontSize: 14, fontFamily: 'Roboto-Bold' }}>
								{`${group.name}:`} <Typography>{group.options.map(option => option.name).join(', ')}</Typography></Typography>
						</View>
					))}
				</View>

				{Boolean(product.message) && (
					<View style={{ marginTop: 5 }}>
						<Typography style={{ fontSize: 14, fontFamily: 'Roboto-Bold' }}>
							Observações:
							<Typography>{product.message}</Typography>
						</Typography>
						
					</View>
				)}
			</View>
		</View>
	)
}
