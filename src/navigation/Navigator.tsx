import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ErrorPage from '../pages/ErrorPage';
import PlayVideoPage from '../pages/PlayVideoPage';

const Navigator: React.FC<{
  setWalletAddress(walletAddress: string): void;
}> = ({ setWalletAddress }) => {
  const [isEthereum, setIsEthereum] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    if (window.ethereum) {
      setIsEthereum(true);
    } else {
      setIsEthereum(false);
    }
  }, []);

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, [address]);

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route
        path='/login'
        element={
          isEthereum ? (
            <LoginPage setAddress={setAddress} />
          ) : (
            <ErrorPage errorTitle={'You need to get Metamask extension'} />
          )
        }
      />
      <Route path='*' element={<ErrorPage />} />
      <Route path='/watch' element={<PlayVideoPage />} />
    </Routes>
  );
};

export default Navigator;
