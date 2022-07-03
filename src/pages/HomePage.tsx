import React, { useEffect, useState } from 'react';
import { ContainerNFT } from '../components/ContainerNFT';

import { contractGenerator } from '../utils/contractGenerator';
import {
  tokenAddress,
  marketplaceAddress,
  tokenAbi,
  maketplaceAbi,
} from '../constants';

import '../styles.css';

const HomePage: React.FC = () => {
  const tokenContract = contractGenerator(tokenAddress, tokenAbi, 'goerli');
  const marketplaceContract = contractGenerator(
    marketplaceAddress,
    maketplaceAbi,
    'goerli'
  );

  const [IDs, setIDs] = useState(0);
  const [baseURI, setBaseURI] = useState('');
  const [URIs, setURIs] = useState<any>([]);

  const getTotalIDs = async () => {
    return await marketplaceContract.getCurrentId();
  };

  const getBaseURI = async () => {
    return await tokenContract.uri(IDs);
  };

  const getURI = async (id: number) => {
    return await tokenContract.idToUri(id);
  };

  const formatedAmount = (amount: any, dec: number, fixed = 0) => {
    return (amount / dec).toFixed(fixed);
  };

  useEffect(() => {
    getTotalIDs().then((data: any) => setIDs(data.toNumber()));
    getBaseURI().then((data: any) => setBaseURI(data));
  }, [marketplaceContract, tokenContract]);

  useEffect(() => {
    for (let i = 1; i <= IDs; i++) {
      //@ts-ignore
      getURI(i).then((data: any) => setURIs((oldArray) => [...oldArray, data]));
    }
  }, [IDs]);

  return (
    <div className='flex w-screen flex-column bg-gradient-to-r from-sky-500 to-purple-500 home-container'>
      {URIs.length > 0 ? (
        URIs.map((uri: string, index: number) => (
          <ContainerNFT uri={uri} index={index} key={index} />
        ))
      ) : (
        <div className='bold m-0'>No data yet</div>
      )}
    </div>
  );
};

export default HomePage;
