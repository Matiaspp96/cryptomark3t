module.exports = [
  "0x206b098F8507880D07045A8eEDde37dC63a15dF5",
  "800000000000000000",
  "0xC7932824AdF77761CaB1988e6B886eEe90D35666",
  {
    id: 1,
    name: "Product 1",
    description: "Description 1",
    price: 100000000000000000,
    seller: "0x206b098F8507880D07045A8eEDde37dC63a15dF5",
    isSold: false,
    ipfsHash:
      "0x626166796265696479703574633676666a73697337727a696f6b346f366a3663",
  },
  "0xd6dd6C7e69D5Fa4178923dAc6A239F336e3c40e3",
];

// struct args
// tuple (struct) Product {
//   uint256 id;
//   string name;
//   string description;
//   uint256 price;
//   address seller;
//   bool isSold;
//   bytes32 ipfsHash;
// }

[
  "0x206b098F8507880D07045A8eEDde37dC63a15dF5",
  "800000000000000000",
  "0xC7932824AdF77761CaB1988e6B886eEe90D35666",
  [
    1,
    "Product 1",
    "Description 1",
    1000,
    "0x206b098F8507880D07045A8eEDde37dC63a15dF5",
    false,
    "0x626166796265696479703574633676666a73697337727a696f6b346f366a3663",
    "home-decoration",
    "https://i.dummyjson.com/data/products/27/1.jpg",
  ],
];
