import React from 'react';
import { Image } from 'react-native';

import { Typography, Icon } from '../../react-native-ui';
import { Container, ContentContainer, Stars, FooterContainer, FooterContent } from './styles';

export default function Company({ item: company }) {
	function renderStars(rate) {
		const stars = [];
		for (let i=1; i<=5; i++) {
			stars.push(<Icon key={i} style={{ root: { margin: 0, marginRight: 2 } }}  name='star' color={i > rate ? '#999999': '#D41450'} size={15} />)
		}
		return stars
	}

	return (
		<Container>
			<Image
				source={{ uri: company.image }}
				style={{
					width: 130,
					height: 130,
				}}
			/>
			<ContentContainer>
				<Typography style={{ fontSize: 20, fontWeight: 'bold' }}>{company.displayName}</Typography>
				<Stars>{renderStars(company.rate)}</Stars>
				<FooterContainer>
					<FooterContent>
						<Icon name='clock' size={15} color='#818181' />
						<Typography style={{ fontSize: 12, color: '#818181' }}>{`~${company.deliveryTime} min`}</Typography>
					</FooterContent>
					<FooterContent>
						<Icon name='map-pin' size={15} color='#818181' />
						<Typography style={{ fontSize: 12, color: '#818181' }}>{`${company.distance} km`}</Typography>
					</FooterContent>
				</FooterContainer>
			</ContentContainer>
		</Container>
	);
}
