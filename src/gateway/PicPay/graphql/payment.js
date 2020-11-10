import gql from 'graphql-tag';

export const REQUES_PIC_PAY_PAYMENT = gql`
	mutation RequestPicPayPayment($companyId: ID!, $userId: ID!, $payment: PicPayPaymentInput!) {
		requestPicPayPayment (companyId: $companyId, userId: $userId, payment: $payment) {
			referenceId
			paymentUrl
		}
	}
`;

export const CHECK_PIC_PAY_PAYMENT = gql`
	mutation CheckPicPayPayment($orderId: ID!) {
		checkPicPayPayment (orderId: $orderId) {
			authorizationId
			referenceId
			status
		}
	}
`;