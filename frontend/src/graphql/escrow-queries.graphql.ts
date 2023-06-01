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