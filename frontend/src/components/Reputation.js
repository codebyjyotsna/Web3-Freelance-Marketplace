import React, { useState, useEffect } from "react";

const Reputation = ({ contract, userAddress }) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      const rating = await contract.methods.getAverageRating(userAddress).call();
      setAverageRating(rating);
    };
    fetchRating();
  }, [contract, userAddress]);

  return (
    <div>
      <h2>Reputation</h2>
      <p>Average Rating: {averageRating}/5</p>
    </div>
  );
};

export default Reputation;
