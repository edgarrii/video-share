const ethers = require('ethers');

export const contractGenerator = (address, abi, network) => {
  const provider = ethers.getDefaultProvider(network);

  const contract = new ethers.Contract(address, abi, provider);
  return contract;
};
