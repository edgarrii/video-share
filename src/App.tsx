import { useState } from "react";

import "./App.css";
import { Modal } from "./components/Modal";
import Navbar from "./components/Navbar";
import Navigator from "./navigation/Navigator";

export default function App() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      {showModal ? (
        <Modal showModal={showModal} setShowModal={setShowModal} />
      ) : null}
      <Navbar setShowModal={setShowModal} walletAddress={walletAddress} />
      <Navigator setWalletAddress={setWalletAddress} />
    </>
  );
}
