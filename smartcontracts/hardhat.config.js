require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("@typechain/hardhat");

const { API_URL_ALCHEMY, PRIVATE_KEY_MARKETPLACE, API_KEY_POLYGONSCAN } =
  process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",
  networks: {
    mumbai: {
      url: API_URL_ALCHEMY,
      accounts: [`0x${PRIVATE_KEY_MARKETPLACE}`],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: API_KEY_POLYGONSCAN,
    },
  },
};
