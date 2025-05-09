// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoPayments {
    event PaymentMade(address from, address to, uint256 amount);

    function makePayment(address payable recipient) public payable {
        require(msg.value > 0, "Payment must be greater than zero.");
        recipient.transfer(msg.value);
        emit PaymentMade(msg.sender, recipient, msg.value);
    }
}
