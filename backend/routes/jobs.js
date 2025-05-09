const express = require("express");
const router = express.Router();
const Web3 = require("web3");
const Marketplace = require("../build/contracts/Marketplace.json");

const web3 = new Web3("http://localhost:7545");
const networkId = Object.keys(Marketplace.networks)[0];
const marketplace = new web3.eth.Contract(
  Marketplace.abi,
  Marketplace.networks[networkId].address
);

router.get("/", async (req, res) => {
  const jobCount = await marketplace.methods.jobCount().call();
  const jobs = [];
  for (let i = 1; i <= jobCount; i++) {
    const job = await marketplace.methods.jobs(i).call();
    jobs.push(job);
  }
  res.json(jobs);
});

module.exports = router;
