import { ArrowForward } from "@mui/icons-material";
import React from "react";

const Card = ({ icon, text }) => {
  return (
    <div class="p-6 sm:h-[280px] sm:w-[257px]   bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img src={icon} alt="img" className="w-[120px]" />
      <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white ml-[16px]">
        {text}
      </h5>
      <a
        href="#"
        class="inline-flex items-center text-[#0091D0] hover:underline mt-[40px] ml-[16px]"
      >
        Learn More
        <span>{<ArrowForward />}</span>
      </a>
    </div>
  );
};

export default Card;
