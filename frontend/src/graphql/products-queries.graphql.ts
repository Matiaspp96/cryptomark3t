import { gql } from '@apollo/client';
export const getProductsQuery = gql`
	query GetProductCreateds {
		productCreateds(where: { or : [{category: "smartphones"}, 
		{category: "laptops"}]}) {
			id
			productId
			name
			description
			image
			price
			seller
			category
			isSold
		}
	}
`;

export const getProductByIdQuery = gql`
	query GetProductCreated($id: ID!) {
		productCreated(id: $id) {
			  image
			  ipfsHash
			  isSold
			  name
			  price
			  productId
			  seller
			  description
			  category
		}
	}
`;

