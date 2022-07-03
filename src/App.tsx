import { useState } from "react";
import { useSelector } from "react-redux";

import "./App.css";
import { Modal } from "./components/Modal";
import Navbar from "./components/Navbar";
import Navigator from "./navigation/Navigator";
import { userSelector } from "./redux/slices/userSlice";

export interface IVideoMetaData {
  key: string;
  Location: string;
  Bucket: string;
  ETag: string;
  Key: string;
}

export default function App() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [videoMetaData, setVideoMetaData] = useState<IVideoMetaData | {}>({});
  const currentUser = useSelector(userSelector);

  return (
    <>
      {showModal ? (
        <Modal
          setVideoMetaData={setVideoMetaData}
          setShowModal={setShowModal}
        />
      ) : null}
      <Navbar setShowModal={setShowModal} walletAddress={walletAddress} />
      <Navigator setWalletAddress={setWalletAddress} />
    </>
  );
}
