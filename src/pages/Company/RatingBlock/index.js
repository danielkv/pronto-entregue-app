import React, { Fragment } from 'react';

import RatingItem from '../../../components/RatingItem';

import { Paper, Divider, Typography } from '../../../react-native-ui';

export default function RatingBlock({ ratings }) {
	return (
		<Paper>
			<Typography variant='title' style={{ marginBottom: 35, fontSize: 26 }}>Avaliações</Typography>
			{ratings.map((rating, index) => (
				<Fragment key={rating.id}>
					<RatingItem item={rating} />
					{index + 1 < ratings.length && <Divider />}
				</Fragment>
			))}
		</Paper>
	);
}
