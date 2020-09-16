import React from 'react'
import { View } from 'react-native'

import { Typography, Chip } from '../../../../react-native-ui'

export default function OrderRollProduct({ product }) {
	return (
		<View key={product.id}>
			<View style={{ marginBottom: 6, flexDirection: 'row' }}>
				<Typography style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>
					{Boolean(product.productRelated.sku) && <Typography style={{ marginLeft: 10 }} variant='caption'>{`#${product.productRelated.sku}`}</Typography>}
					{product.name}
				</Typography>
				{Boolean(product.productRelated?.category?.name) && <Chip style={{ root: { marginLeft: 5, backgroundColor: '#f0f0f0', height: 25 }, text: { fontSize: 11 } }} color='secondary' label={product.productRelated.category.name} />}

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
