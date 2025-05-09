// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FreelancerStaking {
    mapping(address => uint256) public stakes;
    event Staked(address freelancer, uint256 amount);
    event Unstaked(address freelancer, uint256 amount);

    function stake() public payable {
        require(msg.value > 0, "Stake amount must be greater than zero.");
        stakes[msg.sender] += msg.value;
        emit Staked(msg.sender, msg.value);
    }

    function unstake(uint256 amount) public {
        require(stakes[msg.sender] >= amount, "Insufficient stake balance.");
        stakes[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Unstaked(msg.sender, amount);
    }
}
