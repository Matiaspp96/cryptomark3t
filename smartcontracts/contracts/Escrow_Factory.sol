// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "./Escrow.sol";
import "./interfaces/IProduct.sol";

contract EscrowFactory is IProduct {
    address[] public allEscrows;
    address private _ownerMarketplace;
    uint256 private _productIdCounter = 0;
    mapping(address => bool) public whitelistTokens;
    mapping(uint256 => Product) public products;

    event EscrowCreated(
        address escrowAddress,
        address seller,
        uint256 amount,
        address token,
        Product product
    );

    event ProductCreated(
        uint256 productId,
        string name,
        string description,
        uint256 price,
        address seller,
        bool isSold,
        bytes32 ipfsHash,
        string category,
        string image
    );

    modifier onlyOwnerMarketplace() {
        require(
            msg.sender == _ownerMarketplace,
            "Only the owner of the marketplace can call this function"
        );
        _;
    }

    constructor(address ownerMarketplace) {
        _ownerMarketplace = ownerMarketplace;
    }

    function addTokenToWhitelist(address token) public onlyOwnerMarketplace {
        whitelistTokens[token] = true;
    }

    function removeTokenFromWhitelist(
        address token
    ) public onlyOwnerMarketplace {
        whitelistTokens[token] = false;
    }

    function isTokenWhitelisted(address token) public view returns (bool) {
        return whitelistTokens[token];
    }

    function createEscrow(
        address seller,
        uint256 amount,
        address token,
        Product memory product
    ) public onlyOwnerMarketplace returns (address) {
        require(
            isTokenWhitelisted(token),
            "This token is not whitelisted by the marketplace"
        );
        Escrow newEscrow = new Escrow(
            seller,
            amount,
            token,
            product,
            _ownerMarketplace
        );
        allEscrows.push(address(newEscrow));
        createProduct(product);
        emit EscrowCreated(address(newEscrow), seller, amount, token, product);
        return address(newEscrow);
    }

    function createProduct(
        Product memory product
    ) internal onlyOwnerMarketplace {
        uint256 productId = _productIdCounter;
        _productIdCounter++;
        product.id = productId;
        products[productId] = product;
        emit ProductCreated(
            productId,
            product.name,
            product.description,
            product.price,
            product.seller,
            product.isSold,
            product.ipfsHash,
            product.category,
            product.image
        );
    }

    function getAllEscrows() public view returns (address[] memory) {
        return allEscrows;
    }
}
