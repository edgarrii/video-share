import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { contractGenerator } from '../utils/contractGenerator';
import {
  tokenAddress,
  marketplaceAddress,
  tokenAbi,
  maketplaceAbi,
} from '../constants';

export const ContainerNFT = (props: any) => {
  const tokenContract = contractGenerator(tokenAddress, tokenAbi, 'goerli');
  const marketplaceContract = contractGenerator(
    marketplaceAddress,
    maketplaceAbi,
    'goerli'
  );

  const [metaData, setMetaData] = useState<any>(null);

  const { uri, index } = props;

  const allowance = async () => {
    return tokenContract.balanceOf(index + 1);
  };

  const getMetaData = async (uri: string) => {
    const data = await axios.get(`http://localhost:8080/ipfs/${uri}`);
    setMetaData(data.data);
  };
  useEffect(() => {
    getMetaData(uri);
  }, []);

  const buyOrWatchHandler = async () => {
    const a = await allowance();
    console.log(a);
  };

  const logo = metaData
    ? `http://localhost:8080/ipfs/${metaData.image}`
    : require('../assets/logo.png');

  return (
    <div className='flex flex-col w-64 h-64 border-black border-solid border-2 border-indigo-600 rounded-md justify-center items-center m-5 z-10'>
      <div className='w-48 h-48 m-1 justify-center items-center flex'>
        <img src={logo} alt='NFT' className='w-40 h-40' />
      </div>
      <div className='flex flex-col w-full flex font-bold leading-relaxed justify-center items-center'>
        <button
          className='border-2 border-indigo-600 rounded-lg bg-indigo-600 w-32 m-1'
          onClick={buyOrWatchHandler}
        >
          BUY/WATCH
        </button>
        <div className='flex flex-row w-full justify-between'>
          <span className='m-1'>price:4</span>
          <span className='m-1'>ID:4</span>
        </div>
      </div>
    </div>
  );
};
