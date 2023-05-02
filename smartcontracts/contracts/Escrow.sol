// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow is ReentrancyGuard {
    address public seller;
    address public buyer;
    uint256 public amount;
    address public delivery;
    address private _ownerMarketplace;
    address public tokenAddress;
    IERC20 public token;
    uint256 private amountToDelivery;
    uint256 private _plataformFee;
    bool public _activatedByBuyer = false;
    bool public _deliveryBySeller = false;
    bool public _deliveryByBuyer = false;
    bool public _deliveryByDelivery = false;
    bool public _finished = false;

    enum Status {
        Created,
        Paid,
        Sending,
        Delivered,
        Disputed,
        Resolved
    }
    Status public status = Status.Created;

    event Paid();
    event Sending();
    event Delivered();
    event Disputed();
    event Resolved();

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only the buyer can call this function");
        _;
    }

    modifier onlyOwnerMarketplace() {
        require(
            msg.sender == _ownerMarketplace,
            "Only the owner of the marketplace can call this function"
        );
        _;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Only the seller can call this function");
        _;
    }

    modifier onlyDelivery() {
        require(
            msg.sender == delivery,
            "Only the delivery can call this function"
        );
        _;
    }

    modifier inStatus(Status _status) {
        require(status == _status, "Invalid status");
        _;
    }

    constructor(
        address _seller,
        uint256 _amount,
        address _tokenAddress,
        address _marketplace
    ) {
        seller = _seller;
        amount = _amount;
        tokenAddress = _tokenAddress;
        token = IERC20(tokenAddress);
        _ownerMarketplace = _marketplace;
    }

    function pay(address _buyer, uint256 _amountToDelivery)
        public
        inStatus(Status.Created)
    {
        require(_activatedByBuyer == false, "Already activated by buyer");
        require(Status.Paid != status, "Already paid");
        buyer = _buyer;
        amountToDelivery = _amountToDelivery;
        require(
            token.allowance(buyer, address(this)) >= amount + amountToDelivery,
            "Token allowance too low"
        );
        token.transferFrom(buyer, address(this), amount + amountToDelivery);
        status = Status.Paid;
        _activatedByBuyer = true;
        emit Paid();
    }

    function deliver(address _delivery) public inStatus(Status.Paid) {
        require(_activatedByBuyer == true, "Not activated by buyer");
        delivery = _delivery;
        status = Status.Sending;
        emit Sending();
    }

    function deliveredByBuyer() public onlyBuyer inStatus(Status.Sending) {
        _deliveryByBuyer = true;
        finishContract();
    }

    function deliveredBySeller() public onlySeller inStatus(Status.Sending) {
        _deliveryBySeller = true;
        finishContract();
    }

    function deliveredByDelivery()
        public
        onlyDelivery
        inStatus(Status.Sending)
    {
        _deliveryByDelivery = true;
        finishContract();
    }

    function finishContract() internal {
        require(!_finished, "Contract already finished");
        if (_deliveryByBuyer == true && _deliveryByDelivery == true) {
            _finished = true;
            status = Status.Delivered;
            emit Delivered();
            uint256 plaformFee = (amount * _plataformFee) / 10000;
            uint256 amountToSeller = amount - plaformFee;
            token.transfer(seller, amountToSeller);
            token.transfer(delivery, amountToDelivery);
            token.transfer(_ownerMarketplace, plaformFee);
        }
    }

    function dispute() public onlyBuyer inStatus(Status.Paid) {
        status = Status.Disputed;
        emit Disputed();
    }

    function resolve() public onlySeller inStatus(Status.Disputed) {
        status = Status.Resolved;
        emit Resolved();
    }

    function setPlataformFee(uint256 plataformFee) public onlyOwnerMarketplace {
        _plataformFee = plataformFee;
    }

    function withdraw() public onlyOwnerMarketplace {
        require(_finished, "Contract not finished");
        uint256 plaformFee = (amount * _plataformFee) / 10000;
        uint256 amountToSeller = amount - plaformFee;
        token.transfer(seller, amountToSeller);
        token.transfer(delivery, amountToDelivery);
        token.transfer(_ownerMarketplace, plaformFee);
    }

    function cancelByBuyer() public onlyBuyer inStatus(Status.Paid) {
        require(!_finished, "Contract already finished");
        status = Status.Resolved;
        emit Resolved();
        token.transfer(buyer, amount + amountToDelivery);
    }

    function cancelBySeller() public onlySeller inStatus(Status.Paid) {
        require(!_finished, "Contract already finished");
        status = Status.Resolved;
        emit Resolved();
        token.transfer(buyer, amount + amountToDelivery);
    }

    /* Getters */
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getStatus() public view returns (Status) {
        return status;
    }

    function getSeller() public view returns (address) {
        return seller;
    }

    function getBuyer() public view returns (address) {
        return buyer;
    }

    function getAmount() public view returns (uint256) {
        return amount;
    }

    function getAmountToDelivery() public view returns (uint256) {
        return amountToDelivery;
    }

    function getDelivery() public view returns (address) {
        return delivery;
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }
}
