import React, { useState } from "react";

const DisputeResolution = ({ contract }) => {
  const [jobId, setJobId] = useState("");
  const [reason, setReason] = useState("");

  const raiseDispute = async () => {
    await contract.methods.raiseDispute(jobId, reason).send({ from: window.ethereum.selectedAddress });
    alert("Dispute raised successfully!");
  };

  return (
    <div>
      <h2>Raise a Dispute</h2>
      <input
        type="number"
        placeholder="Job ID"
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
      />
      <textarea
        placeholder="Reason for dispute"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      ></textarea>
      <button onClick={raiseDispute}>Raise Dispute</button>
    </div>
  );
};

export default DisputeResolution;
