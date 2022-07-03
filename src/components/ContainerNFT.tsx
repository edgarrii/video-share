import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { contractGenerator } from '../utils/contractGenerator';
import {
  tokenAddress,
  marketplaceAddress,
  tokenAbi,
  maketplaceAbi,
} from '../constants';
import { LOCAL_IPFS_NODE_URL } from '../constants';
import { useNavigate } from 'react-router-dom';

export const ContainerNFT = (props: any) => {
  let navigate = useNavigate();
  const tokenContract = contractGenerator(tokenAddress, tokenAbi, 'goerli');
  const IPFS_URL = LOCAL_IPFS_NODE_URL;
  const marketplaceContract = contractGenerator(
    marketplaceAddress,
    maketplaceAbi,
    'goerli'
  );

  const [metaData, setMetaData] = useState<any>(null);
  const [price, setPrice] = useState<any>(null);

  const { uri, index, user } = props;
  const id = index;
  const amount = 1;
  const data = '0x';
  const bought = async () => {
    return await tokenContract.balanceOf(user, id);
  };
  const getPrice = async (id: number | string) => {
    return await marketplaceContract.idToNft(id);
  };
  const getMetaData = async (uri: string) => {
    const data = await axios.get(`${IPFS_URL}${uri}`);
    setMetaData(data.data);
  };
  useEffect(() => {
    getMetaData(uri);
    getPrice(id).then((data) => setPrice(data.price.toNumber()));
  }, [id]);

  const buyOrWatchHandler = async () => {
    const allowance = await bought();
    if (allowance.toNumber() === 0) {
      const boughtData = await marketplaceContract.buy(id, amount, data, {
        value: price,
      });
      return boughtData;
    }
    navigate(`/watch`, { state: JSON.parse(metaData.video) });
  };

  const logo = metaData
    ? `${IPFS_URL}/${metaData.image}`
    : require('../assets/logo.png');

  return (
    <div className='flex flex-col w-96 h-96 border-black border-solid border-2 border-indigo-600 rounded-md justify-around items-center m-5 z-10'>
      <div className='w-48 h-48 m-1 justify-center items-center flex'>
        <img src={logo} alt='NFT' className='w-64 h-64' />
      </div>
      <div className='flex flex-col w-full flex font-bold leading-relaxed justify-center items-center'>
        <button
          className='border-2 border-indigo-600 rounded-lg bg-indigo-600 w-32 m-1'
          onClick={buyOrWatchHandler}
        >
          BUY/WATCH
        </button>
        <div className='flex flex-row w-full justify-between'>
          <span className='m-1'>price:{price}</span>
          <span className='m-1'>ID:{id}</span>
        </div>
      </div>
    </div>
  );
};
