import { Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { ClosedIcon } from "./ClosedIcon";
import { FileContainer } from "./FileContainer";

export const Modal: React.FC<{
  showModal: boolean;
  setShowModal(condition: boolean): void;
}> = ({ showModal, setShowModal }) => {
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] =
    useState<boolean>(true);
  const [videoFile, setVideoFile] = useState<any>();

  useEffect(() => {
    videoFile && setIsConfirmButtonDisabled(false);
  }, [videoFile]);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Create your NFT with video
              </h3>
              <ClosedIcon setShowModal={setShowModal} />
            </div>
            {/*body*/}
            {/* <Input>Name of the film</Input> */}
            <FileContainer
              accept="video/mp4,video/*"
              title="Upload your video"
              setVideoFile={setVideoFile}
            />
            <FileContainer
              accept="image/*"
              title="Upload your NFT image"
              setVideoFile={setVideoFile}
            />
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
                onClick={() => setShowModal(false)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
