import React from 'react';

import { Avatar, Typography, Icon } from '../../react-native-ui';
import { Container, CommentContainer, Stars, CommentInfo } from './styles';

export default function RatingItem({ item: rating }) {
	function renderStars(rate) {
		const stars = [];
		for (let i=1; i<=5; i++) {
			stars.push(<Icon key={i} style={{ root: { margin: 0, marginRight: 2 } }} name='star' color={i > rate ? '#999999': '#D41450'} size={15} />)
		}
		return stars
	}
	return (
		<Container>
			<Avatar size={30} alt={rating.user.fullName} source={{ uri: rating.user.image }} />
			<CommentContainer>
				<CommentInfo>
					<Typography style={{ fontWeight: 'bold', fontSize: 16, color: '#655A51' }}>{rating.user.fullName}</Typography>
					<Typography style={{ marginLeft: 8, fontWeight: 'normal', fontSize: 12, color: '#655A51' }}>{rating.user.fullName}</Typography>
				</CommentInfo>
				<Stars>{renderStars(rating.rate)}</Stars>
				<Typography variant='text' style={{ color: '#655A51', marginTop: 15 }}>{rating.comment}</Typography>
			</CommentContainer>
		</Container>
	);
}
