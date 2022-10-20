import React from "react";
import {
    business_1,
    business_2,
    icon_1,
    icon_2,
    icon_3,
    icon_4,
  } from "../assets";
  import Card from "./Card";
const BusinessContainer = () => {
  return (
    <div>
      <div className="relative sm:flex flex-col hidden">
        <img src={business_2} />
        <h3 className="absolute font-bold text-black top-[70px] left-1/2 -translate-x-1/2">
          WE ARE THE WORLDS FIRST PLATFORM
        </h3>
        <h2 className="text-3xl max-w-[35ch] absolute font-bold text-black top-[110px] left-1/2 -translate-x-1/2">
          Manage your business and kind workforce full time/hourly anytime
          anywhere
        </h2>
        <div className="flex flex-row gap-6 absolute text-white top-[400px] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Card icon={icon_1} text="Manage Your Business" />
          <Card icon={icon_2} text="Post A Full Time Opportunity" />
          <Card icon={icon_3} text="Post A Part Time Opportunity" />
          <Card icon={icon_4} text="Post A Project" />
        </div>
      </div>

      <div className="relative sm:hidden flex flex-col h-[1100px]">
        <img src={business_1} className="h-[1100px]" />
        <h3 className="absolute font-bold text-black top-[70px] left-1/2 -translate-x-1/2">
          FOR BUSINESS COMMUNITY
        </h3>
        <h2 className="text-3xl absolute font-bold text-black top-[130px] left-1/2 -translate-x-1/2">
          Manage your business and kind workforce full time/hourly anytime
          anywhere
        </h2>
        <div className="businesscontainer w-[390px] h-[300px] grid grid-cols-2 gap-3 absolute text-white top-[400px] mt-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Card icon={icon_1} text="Manage Your Business" />
          <Card icon={icon_2} text="Post A Full Time Opportunity" />
          <Card icon={icon_3} text="Post A Part Time Opportunity" />
          <Card icon={icon_4} text="Post A Project" />
        </div>
      </div>

      <div className="anotherdiv sm:hidden flex flex-col bg-right"> </div>
    </div>
  );
};

export default BusinessContainer;
