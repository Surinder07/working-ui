import { ArrowForward } from "@mui/icons-material";
import React from "react";

const Card = ({ icon, text }) => {
  return (
    <div className="p-6 flex flex-col cardsmall sm:h-[300px] sm:w-[257px]  bg-white rounded-lg border border-gray-200 shadow-md ">
      <img src={icon} alt="img" className="w-[120px]" />
      <h5 className="mb-2 flex-1 text-2xl font-semibold tracking-tight text-gray-900  ml-[16px]">
        {text}
      </h5>
      <a
        href="#"
        className="inline-flex items-center text-[#0091D0] hover:underline mt-[40px] ml-[16px]"
      >
        Coming soon
        <span>{<ArrowForward />}</span>
      </a>
    </div>
  );
};

export default Card;
