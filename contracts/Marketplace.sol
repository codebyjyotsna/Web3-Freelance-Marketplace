// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DisputeResolution {
    enum DisputeStatus { Open, Resolved, Rejected }
    struct Dispute {
        uint id;
        uint jobId;
        address complainant;
        string reason;
        DisputeStatus status;
    }

    uint public disputeCount = 0;
    mapping(uint => Dispute) public disputes;
    event DisputeRaised(uint id, uint jobId, address complainant, string reason);
    event DisputeResolved(uint id, DisputeStatus status);

    function raiseDispute(uint jobId, string memory reason) public {
        disputeCount++;
        disputes[disputeCount] = Dispute(disputeCount, jobId, msg.sender, reason, DisputeStatus.Open);
        emit DisputeRaised(disputeCount, jobId, msg.sender, reason);
    }

    function resolveDispute(uint disputeId, bool isResolved) public {
        Dispute storage dispute = disputes[disputeId];
        require(dispute.status == DisputeStatus.Open, "Dispute already resolved or rejected.");
        dispute.status = isResolved ? DisputeStatus.Resolved : DisputeStatus.Rejected;
        emit DisputeResolved(disputeId, dispute.status);
    }
}
