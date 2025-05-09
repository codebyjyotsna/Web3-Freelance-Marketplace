// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReputationSystem {
    struct Rating {
        uint jobId;
        address reviewer;
        uint8 score; // Score out of 5
        string comment;
    }

    mapping(address => Rating[]) public ratings;

    event Rated(address user, uint jobId, uint8 score, string comment);

    function addRating(address user, uint jobId, uint8 score, string memory comment) public {
        require(score <= 5, "Rating must be between 0 and 5.");
        ratings[user].push(Rating(jobId, msg.sender, score, comment));
        emit Rated(user, jobId, score, comment);
    }

    function getAverageRating(address user) public view returns (uint256) {
        Rating[] memory userRatings = ratings[user];
        uint256 totalScore = 0;
        for (uint i = 0; i < userRatings.length; i++) {
            totalScore += userRatings[i].score;
        }
        return userRatings.length > 0 ? totalScore / userRatings.length : 0;
    }
}
