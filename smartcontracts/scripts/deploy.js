// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
require("dotenv").config();
const { Wallet, utils, providers } = require("ethers");
const hre = require("hardhat");
const products = require("./products");
const { PUBLIC_KEY_SELLER, PUBLIC_KEY_MARKETPLACE, API_KEY_ALCHEMY } =
  process.env;

const provider = new providers.AlchemyProvider("maticmum", API_KEY_ALCHEMY);

const tokenAddress = "0xC7932824AdF77761CaB1988e6B886eEe90D35666";
const factoryAddress = "0xE2779614C8B99491204148DD408fD5Cf3eC538CA";
const ProductMock = {
  id: 1,
  name: "Product 2",
  description: "Description 2",
  price: 100,
  seller: "0x206b098F8507880D07045A8eEDde37dC63a15dF5",
  isSold: false,
  ipfsHash:
    "0x626166796265696479703574633676666a73697337727a696f6b346f366a3663",
  category: "home-decoration",
  image: "https://i.dummyjson.com/data/products/27/1.jpg",
};

async function main() {
  const Factory = await hre.ethers.getContractFactory("EscrowFactory");
  const factory = await Factory.deploy(PUBLIC_KEY_MARKETPLACE);

  console.log("Escrow Factory deployed to:", factory.address);
}

async function escrow() {
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(
    PUBLIC_KEY_SELLER,
    utils.parseEther("100"),
    tokenAddress,
    Product,
    PUBLIC_KEY_MARKETPLACE
  ); // Args: address _seller, uint256 _amount, address _tokenAddress, Product memory _product, address _marketplace

  await escrow.deployed();
  console.log("Escrow deployed to:", escrow.address);
}

async function createEscrow() {
  const Factory = await hre.ethers.getContractFactory("EscrowFactory");
  const factory = await Factory.attach(factoryAddress);
  const signer = new Wallet(process.env.PRIVATE_KEY_MARKETPLACE);

  // const escrow = await factory.createEscrow(
  //   PUBLIC_KEY_SELLER,
  //   utils.parseEther("100"),
  //   tokenAddress,
  //   Product
  // );
  // console.log(escrow);
  const wallet = signer.connect(provider);

  let i = -1;
  const interval = setInterval(async () => {
    i++;
    if (i >= products.length) {
      clearInterval(interval);
      return;
    }

    const escrow = await factory
      .connect(wallet)
      .createEscrow(
        products[i].seller,
        utils.parseEther(products[i].price.toString()),
        tokenAddress,
        {
          id: products[i].id,
          name: products[i].name,
          description: products[i].description,
          price: products[i].price,
          seller: products[i].seller,
          isSold: products[i].isSold,
          ipfsHash: ProductMock.ipfsHash,
          category: products[i].category,
          image: products[i].thumbnail,
        }
      );
    console.log(escrow);
  }, 2000);
}

createEscrow().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
