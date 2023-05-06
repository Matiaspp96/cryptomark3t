// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "./Escrow.sol";
import "./interfaces/IProduct.sol";

contract EscrowFactory is IProduct {
    address[] public allEscrows;
    address private _ownerMarketplace;
    mapping(address => bool) public whitelistTokens;

    event EscrowCreated(
        address escrowAddress,
        address seller,
        uint256 amount,
        address token,
        Product product
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
        Escrow newEscrow = new Escrow(
            seller,
            amount,
            token,
            product,
            _ownerMarketplace
        );
        allEscrows.push(address(newEscrow));
        emit EscrowCreated(address(newEscrow), seller, amount, token, product);
        return address(newEscrow);
    }

    function getAllEscrows() public view returns (address[] memory) {
        return allEscrows;
    }
}
