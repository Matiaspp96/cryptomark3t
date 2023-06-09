const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { BigNumber } = require("ethers");
require("@nomicfoundation/hardhat-chai-matchers");

const AMOUNT = ethers.utils.parseEther("10");
const AMOUNTBYDELIVERY = ethers.utils.parseEther("5");
const PLATFORM_FEE_BPS = 800; // 8%
const Product = {
  id: 1,
  name: "Product 1",
  description: "Description 1",
  price: ethers.utils.parseEther("100"),
  seller: "0x206b098F8507880D07045A8eEDde37dC63a15dF5",
  isSold: false,
};

async function fixture() {
  const [deployer, seller] = await ethers.getSigners();
  const EscrowFactory = await ethers.getContractFactory("EscrowFactory");
  const Escrow = await ethers.getContractFactory("Escrow");
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  const escrowFactory = await EscrowFactory.deploy(deployer.address);
  await escrowFactory.deployed();
  const escrow = await Escrow.deploy(
    seller.address,
    AMOUNT,
    token.address,
    Product,
    deployer.address
  );
  await escrow.deployed();
  return {
    deployer,
    token,
    escrowFactory,
    escrow,
  };
}

describe("Factory", async () => {
  beforeEach(async () => {
    [deployer, seller, buyer, delivery] = await ethers.getSigners();
    ({ deployer, token, escrowFactory, escrow } = await loadFixture(fixture));
  });

  it("Should add and remove tokens from whitelist", async () => {
    await escrowFactory.addTokenToWhitelist(token.address);
    expect(await escrowFactory.isTokenWhitelisted(token.address)).to.be.true;
    await escrowFactory.removeTokenFromWhitelist(token.address);
    expect(await escrowFactory.isTokenWhitelisted(token.address)).to.be.false;
  });

  it("Should create an escrow and add it to allEscrows", async () => {
    const tx = await escrowFactory.createEscrow(
      seller.address,
      AMOUNT,
      token.address,
      Product
    );
    const receipt = await tx.wait();
    const escrows = await escrowFactory.getAllEscrows();
    expect(escrows.length).to.equal(1);
    expect(escrows[0]).to.equal(receipt.events[0].args[0]);
  });

  it("Should only allow the owner of the marketplace to create escrows", async () => {
    const sellerAddress = seller.address;
    const amount = AMOUNT;
    const tokenAddress = token.address;
    await expect(
      escrowFactory
        .connect(buyer)
        .createEscrow(sellerAddress, amount, tokenAddress, Product)
    ).to.be.revertedWith(
      "Only the owner of the marketplace can call this function"
    );
  });
});

describe("Escrow", async () => {
  beforeEach(async () => {
    [deployer, seller, buyer, delivery] = await ethers.getSigners();
    ({ deployer, token, escrowFactory, escrow } = await loadFixture(fixture));
    await token.mint(buyer.address, AMOUNT.add(AMOUNTBYDELIVERY));
    await token
      .connect(buyer)
      .approve(escrow.address, AMOUNT.add(AMOUNTBYDELIVERY));
    await escrow.connect(buyer).pay(buyer.address, AMOUNTBYDELIVERY);
  });

  describe("Pay", async () => {
    it("Should allow a buyer to pay successfully", async () => {
      expect(await token.balanceOf(escrow.address)).to.equal(
        AMOUNT.add(AMOUNTBYDELIVERY)
      );
      expect(await escrow.status()).to.equal(1);
    });

    describe("Delivery", async () => {
      beforeEach(async () => {
        await escrow.connect(delivery).deliver(delivery.address);
      });
      it("Should update delivery address and status", async () => {
        expect(await escrow.status()).to.equal(2);
      });

      it("Should allow delivery to send the item and emit Sent event", async () => {
        expect(await escrow.connect(delivery).deliveredByDelivery()).to.emit(
          escrow,
          "Sent"
        );
        expect(await escrow._deliveryByDelivery()).to.equal(true);
        expect(await escrow._finished()).to.equal(false);
      });

      describe("Complete", async () => {
        const platformFee = AMOUNT.mul(PLATFORM_FEE_BPS).div(10000);

        beforeEach(async () => {
          await escrow.connect(seller).deliveredBySeller();
        });

        it("Should allow the seller to mark the item as shipped but not completed", async () => {
          expect(await escrow._deliveryBySeller()).to.equal(true);
          expect(await escrow._finished()).to.equal(false);
        });

        it("Should allow the buyer to mark the item as recieve and completed", async () => {
          const initialBeneficiaryBalance = await token.balanceOf(
            deployer.address
          );
          expect(await escrow.connect(buyer).deliveredByBuyer()).to.emit(
            escrow,
            "Completed"
          );
          expect(await escrow._finished()).to.equal(true);
          expect(await token.balanceOf(seller.address)).to.equal(
            AMOUNT.sub(platformFee)
          );
          expect(await token.balanceOf(delivery.address)).to.equal(
            AMOUNTBYDELIVERY
          );
          expect(await token.balanceOf(deployer.address)).to.equal(
            initialBeneficiaryBalance.add(platformFee)
          );
        });

        it("Should allow the delivery to mark the item as delivered and completed", async () => {
          const initialBeneficiaryBalance = await token.balanceOf(
            deployer.address
          );
          expect(await escrow.connect(delivery).deliveredByDelivery()).to.emit(
            escrow,
            "Completed"
          );
          expect(await escrow._finished()).to.equal(true);
          expect(await token.balanceOf(seller.address)).to.equal(
            AMOUNT.sub(platformFee)
          );
          expect(await token.balanceOf(delivery.address)).to.equal(
            AMOUNTBYDELIVERY
          );
          expect(await token.balanceOf(deployer.address)).to.equal(
            initialBeneficiaryBalance.add(platformFee)
          );
        });
      });
    });
  });

  describe("Cancel", async () => {
    it("Should allow the buyer to cancel the escrow", async () => {
      expect(await escrow.status()).to.equal(1);
      await escrow.connect(buyer).cancelByBuyer();
      expect(await token.balanceOf(buyer.address)).to.equal(
        AMOUNT.add(AMOUNTBYDELIVERY)
      );
    });

    it("Should allow the seller to cancel the escrow", async () => {
      expect(await escrow.status()).to.equal(1);
      await escrow.connect(seller).cancelBySeller();
      expect(await token.balanceOf(buyer.address)).to.equal(
        AMOUNT.add(AMOUNTBYDELIVERY)
      );
    });
  });
});

function bn(x) {
  return BigNumber.from(x);
}
