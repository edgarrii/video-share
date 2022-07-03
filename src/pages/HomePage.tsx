import React, { useEffect, useState } from "react";

import { ContainerNFT } from "../components/ContainerNFT";
import "../styles.css";

const ethers = require("ethers");

const HomePage: React.FC = () => {
  const provider = ethers.getDefaultProvider("goerli");

  const maketPlaceAbi = require("../abi/marketplace.json");
  const tokenAbi = require("../abi/pausToken.json");

  const marketplaceAddress = "0x4C7be03F3E15d01856923d1c72F0f6E729B32C56";
  const tokenAddress = "0x7E6c0A56d6b04C0fE5FeCE539AC953991ADA1838";

  const marketplaceContract = new ethers.Contract(
    marketplaceAddress,
    maketPlaceAbi,
    provider
  );
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

  const [IDs, setIDs] = useState(0);

  const getTotalIDs = async () => {
    const totalIDs = await marketplaceContract.getCurrentId();
  };

  const getURI = async (id: number) => {
    const URI = await tokenContract.uri(id);
  };

  const formatedAmount = (amount: any, dec: number, fixed = 0) => {
    return (amount / dec).toFixed(fixed);
  };

  useEffect(() => {
    getTotalIDs().then((data: any) => setIDs(data?.toString()));
  }, [marketplaceContract]);

  useEffect(() => {}, [IDs]);

  return (
    <div className="flex w-screen flex-column bg-gradient-to-r from-sky-500 to-purple-500 home-container">
      <ContainerNFT />
    </div>
  );
};

export default HomePage;
