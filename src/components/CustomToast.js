import { Slide, toast } from "react-toastify";
import {
  AiOutlineCheckCircle,
  AiFillWarning,
  AiOutlineClose,
} from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { IoIosInformationCircle } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import React from "react";

const toastConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const ToastContent = ({ Icon, text }) => (
  <div className="grid grid-cols-10 gap-1">
    <div className="flex items-center col-span-9">
      <Icon size="30px" />
      <div className="ml-3">{text}</div>
    </div>
    <div className="col-span-1 flex">
      <AiOutlineClose color="black" size="12px" />
    </div>
  </div>
);

export const ToastSuccess = (text, config) => {
  toast(
    <ToastContent Icon={<AiOutlineCheckCircle color="green" />} text={text} />,
    { ...toastConfig, ...config }
  );
};

export const ToastInfo = (text, config) => {
  toast(
    <ToastContent
      Icon={<IoIosInformationCircle color="#00cfe8" />}
      text={text}
    />,
    { ...toastConfig, ...config }
  );
};

export const ToastWarning = (text, config) => {
  toast(<ToastContent Icon={<AiFillWarning color="yellow" />} text={text} />, {
    ...toastConfig,
    ...config,
  });
};

export const ToastUpdate = (text, toastId) => {
  toast.update(toastId, {
    position: "top-right",
    render: <ToastContent Icon={<GrUpdate color="blue" />} text={text} />,
    progress: true,
    hideProgressBar: false,
    autoClose: 2000,
  });
};

export const ToastConfig = () => {
  toast.configure({
    position: "top-right",
    role: "alert",
    hideProgressBar: true,
    transition: Slide,
    closeButton: false,
    pauseOnFocusLoss: false,
    autoClose: 2000,
  });
};

export const ToastError = (text, config) => {
  toast(<ToastContent Icon={<VscError color="red" />} text={text} />, {
    ...toastConfig,
    ...config,
  });
};
