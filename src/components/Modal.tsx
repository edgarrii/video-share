import React, { useEffect, useState } from "react";

import { Input } from "@material-tailwind/react";
import { ethers } from "ethers";
import axios from "axios";

import { ClosedIcon } from "./ClosedIcon";
import { FileContainer } from "./FileContainer";
import { generateBody, toWei } from "../utils";
import marketplace from "../abi/marketplace.json";
import { BACKEND_URL, MARKETPLACE_CONTRACT_ADDRESS } from "../constants";
import { IVideoMetaData } from "../App";
import "../styles.css";
import { LoaderModal } from "./LoaderModal";

export const Modal: React.FC<{
  setShowModal(condition: boolean): void;
  setVideoMetaData(data: IVideoMetaData): void;
}> = ({ setShowModal, setVideoMetaData }) => {
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] =
    useState<boolean>(true);
  const [videoFile, setVideoFile] = useState<any>(null);
  const [imageFile, setImageFile] = useState<any>(null);
  const [videoName, setVideoName] = useState<string>("");
  const [nftPrice, setNftPrice] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const abi = require("../abi/marketplace.json");
  let provider = ethers.getDefaultProvider("goerli");
  let contractAddress = MARKETPLACE_CONTRACT_ADDRESS;
  let contract = new ethers.Contract(contractAddress, abi, provider);

  const handleConfirm = async () => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/uploadVideo`,
        generateBody(videoFile),
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setVideoMetaData(data.result);
    } catch (error) {
      console.log(error);
    }

    setShowModal(false);
  };

  useEffect(() => {
    videoFile &&
      imageFile &&
      videoName &&
      nftPrice > 0 &&
      setIsConfirmButtonDisabled(false);
  }, [videoFile, nftPrice]);

  return (
    <>
      {isLoading ? (
        <LoaderModal />
      ) : (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold mr-10">
                    Create your NFT with video
                  </h3>
                  <ClosedIcon setShowModal={setShowModal} />
                </div>
                {/*body*/}
                <FileContainer
                  accept="video/mp4,video/*"
                  title="Upload your video"
                  file={videoFile}
                  setVideoFile={setVideoFile}
                />
                <FileContainer
                  accept="image/*"
                  title="Upload your NFT image"
                  file={imageFile}
                  setImageFile={setImageFile}
                />
                <Input
                  className="p-1 mx-4 w-80 border border-slate-300 hover:border-indigo-300 rounded"
                  size="md"
                  variant="outlined"
                  placeholder="Name your video"
                  onChange={(e) => setVideoName(e.target.value)}
                />
                <div className="flex items-start mx-4 mr-auto">
                  <Input
                    type="number"
                    pattern="[0-9]\d*\.?\d*$"
                    className="p-1  w-20 border border-slate-300 hover:border-indigo-300 rounded mr-2"
                    size="md"
                    variant="outlined"
                    placeholder="Price"
                    onChange={(e) => setNftPrice(+e.target.value)}
                  />
                  <span>ETH</span>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:opacity-70"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className={
                      isConfirmButtonDisabled
                        ? "cursor-not-allowed disabled:opacity-80 bg-emerald-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        : "bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    }
                    type="button"
                    disabled={isConfirmButtonDisabled}
                    onClick={handleConfirm}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};
