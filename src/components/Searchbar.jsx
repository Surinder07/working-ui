import React, { useState } from "react";
import { SearchOutlined } from "@mui/icons-material";

const Searchbar = ({ text, icon, color }) => {
  const [field, setField] = useState("");
  return (
    <div class="flex items-center justify-center">
      <form method="GET">
        <div className={`relative text-gray-600 focus-within:text-gray-400`}>
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              {icon}
            </button>
          </span>
          <input
            type="search"
            name="q"
            className="w-[13.5rem] h-[2rem] lg:w-[17rem] lg:h-[2.5rem] sm:w-[19rem] py-2 text-sm text-black bg-white rounded-[25px] pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
            placeholder={text}
            autoComplete="off"
            value={field}
            onChange={(e) => setField(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
