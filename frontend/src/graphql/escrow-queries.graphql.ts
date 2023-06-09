import { gql } from "@apollo/client";

export const getEscrowByIdQuery = gql`
    query GetEscrowById($product_id: String) {
        escrowCreateds(where: {product_id: $product_id}) {
            product_name
            escrowAddress
            token
            seller
        }
    }
`;

export const getEscrowByAddressQuery = gql`
    query GetEscrowByAddress($escrowAddress: String) {
        escrowCreateds(where: {escrowAddress: $escrowAddress}) {
            product_name
            escrowAddress
            token
            seller
        }
    }
`;


export const getProductsBySeller = gql`
	query GetProductCreateds($product_seller: String!) {
		escrowCreateds(
            where: {product_seller: $product_seller}
          ) {
            product_isSold
            product_name
            product_price
            product_image
            product_id
            product_description
            product_category
            escrowAddress
          }
	}
`;

