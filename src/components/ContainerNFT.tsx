import React from 'react';

const logo = require('../assets/logo.png');

export const ContainerNFT = (props: any) => {
  const buyOrWatchHandler = (data: any) => {
    console.log(data);
  };

  return (
    <div className='flex flex-col w-64 h-64 border-black border-solid border-2 border-indigo-600 rounded-md justify-center items-center m-5 z-10'>
      <div className='w-48 h-48 m-1 justify-center items-center flex'>
        <img src={logo} alt='NFT' className='w-40 h-40' />
      </div>
      <div className='flex flex-col w-full flex font-bold leading-relaxed justify-center items-center'>
        <button
          className='border-2 border-indigo-600 rounded-lg bg-indigo-600 w-32 m-1'
          onClick={() => buyOrWatchHandler(1)}
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
