// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
require("dotenv").config();
const { utils } = require("ethers");
const hre = require("hardhat");

const { PUBLIC_KEY_SELLER, PUBLIC_KEY_MARKETPLACE } = process.env;
const tokenAddress = "0xC7932824AdF77761CaB1988e6B886eEe90D35666";

async function main() {
  const Factory = await hre.ethers.getContractFactory("EscrowFactory");
  const factory = await Factory.deploy(PUBLIC_KEY_MARKETPLACE);

  console.log("Escrow deployed to:", factory.address);
}

async function escrow() {
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(
    PUBLIC_KEY_SELLER,
    utils.parseEther("0.05"),
    tokenAddress,
    PUBLIC_KEY_MARKETPLACE
  ); // Args: address _seller, uint256 _amount, address _tokenAddress, address _marketplace

  await escrow.deployed();
  console.log("Escrow deployed to:", escrow.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
