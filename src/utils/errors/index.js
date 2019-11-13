import React from 'react';

import { ErrorContainer, ErrorTitle, ErrorMessage } from './styles';

export const getErrors = (err) => {
	if (err.graphQLErrors) {
		if (err.graphQLErrors[0] && err.graphQLErrors[0].message) {
			return err.graphQLErrors[0].message;
		}
		console.log(err.graphQLErrors);
	}

	if (err.networkError) return err.networkError.message;

	if (err.message) return err.message;

	return err;
}

export class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null
		};
	}
  
	static getDerivedStateFromError(error) {
		// Atualiza o state para que a próxima renderização mostre a UI alternativa.
		return { error: getErrors(error) };
	}
  
	componentDidCatch(error) {
		// Você também pode registrar o erro em um serviço de relatórios de erro
		this.setState({
			error: getErrors(error),
		});
	}
  
	render() {
		const { error } = this.state;
		const { children } = this.props;

		if (error) {
			// Você pode renderizar qualquer UI alternativa
			return (
				<ErrorContainer>
					<ErrorTitle>Ocorreu um erro</ErrorTitle>
					<ErrorMessage>{error}</ErrorMessage>
				</ErrorContainer>
			);
		}
  
		return children;
	}
}