// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

interface IProduct {
    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 price;
        address seller;
        bool isSold;
        bytes32 ipfsHash;
        string category;
        string image;
    }
}
