import { gql } from '@apollo/client';
export const getProductsQuery = gql`
	query GetProductCreateds {
		productCreateds {
			id
			productId
			name
			description
			image
			price
			seller
			category
		}
	}
`;
