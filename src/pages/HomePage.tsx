import { Button } from '@material-tailwind/react';
import React from 'react';
import { ContainerNFT } from '../components/ContainerNFT';

import '../styles.css';

const HomePage: React.FC = () => {
  return (
    <div className='flex w-screen flex-column bg-gradient-to-r from-sky-500 to-purple-500 home-container'>
      <ContainerNFT />
    </div>
  );
};

export default HomePage;
