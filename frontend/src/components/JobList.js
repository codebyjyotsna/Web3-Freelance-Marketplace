import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Marketplace from "../contracts/Marketplace.json";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Marketplace.networks[networkId];
      const contract = new web3.eth.Contract(Marketplace.abi, deployedNetwork.address);

      const jobCount = await contract.methods.jobCount().call();
      const jobs = [];
      for (let i = 1; i <= jobCount; i++) {
        const job = await contract.methods.jobs(i).call();
        jobs.push(job);
      }
      setJobs(jobs);
    };

    loadBlockchainData();
  }, []);

  return (
    <div>
      <h1>Job List</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            Job #{job.id}: {job.price} ETH
            {job.freelancer === "0x0000000000000000000000000000000000000000" ? (
              <button>Accept Job</button>
            ) : (
              <span>Accepted</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
