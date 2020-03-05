import React, { Fragment } from 'react';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../../components/ErrorBlock';
import LoadingBlock from '../../../components/LoadingBlock';
import RatingItem from '../../../components/RatingItem';

import { Paper, Divider, Typography, Button } from '../../../react-native-ui';
import { getErrors } from '../../../utils/errors';

import { GET_RATINGS } from '../../../graphql/companies';

export default function RatingBlock({ companyId }) {
	const rowsPerPage = 8;
	const { data: { ratings = [], countRatings = 0, pageInfo: { page = 0 } = {} } = {}, loading: loadingRatings, error: ratingsError, fetchMore = null } = useQuery(GET_RATINGS, { notifyOnNetworkStatusChange: true,  variables: { filter: { companyId }, pagination: { page: 0, rowsPerPage } } });

	function loadMore (nexPage) {
		if (!fetchMore) return;

		return fetchMore({
			variables: {
				pagination: {
					page: nexPage,
					rowsPerPage
				}
			},
			updateQuery(prev, { fetchMoreResult }) {
				if (!fetchMoreResult) return prev;
				return Object.assign({}, prev, {
					ratings: [...prev.ratings, ...fetchMoreResult.ratings],
					pageInfo: fetchMoreResult.pageInfo,
				});
			}
		})
	}

	if (ratingsError) return <ErrorBlock error={getErrors(ratingsError)} />;
	if (loadingRatings && !ratings.length) return <LoadingBlock />;
	if (!ratings.length) return false;

	return (
		<Paper>
			<Typography variant='title' style={{ marginBottom: 35, fontSize: 26 }}>Avaliações</Typography>
			{ratings.map((rating, index) => (
				<Fragment key={index}>
					<RatingItem item={rating} />
					{index + 1 < ratings.length && <Divider />}
				</Fragment>
			))}
			{loadingRatings
				? <LoadingBlock />
				: (page < (countRatings / rowsPerPage)) && <Button variant='outlined' color='primary' style={{ root: { marginTop: 15 } }} onPress={()=>{loadMore(page+1)}}>Carregar mais</Button>}
		</Paper>
	);
}
