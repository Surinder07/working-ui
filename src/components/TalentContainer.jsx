import React from "react";
import {
  business_1,
  business_2,
  icon_1,
  icon_2,
  icon_3,
  icon_4,
  icon_5,
  icon_6,
  talent_1,
  talent_2,
} from "../assets";
import Card from "./Card";
const TalentContainer = () => {
  return (
    <div>
      <div className="relative sm:flex flex-col hidden tablet:h-[600px]">
        <img src={talent_2} className="tablet:h-[600px] image-containers lg:h-[100vh]" />
        <h3 className="absolute font-bold text-white top-[70px] left-1/2 -translate-x-1/2 lg:mt-[50px]">
          FOR TALENT COMMUNITY
        </h3>
        <h2 className="text-3xl max-w-[35ch] absolute font-bold text-white top-[110px] left-1/2 -translate-x-1/2 lg:mt-[50px]">
          Find great work you are passionate about and earn on your own terms
          anytime anywhere
        </h2>
        <div className="businessContainerMain tablet:w-[710px] tablet:mt-[22px] flex flex-row gap-6 absolute text-white top-[400px] left-1/2 -translate-x-1/2 -translate-y-1/2 lg:mt-[50px]">
          <Card icon={icon_5} text="Create Your Talent Profile" />
          <Card icon={icon_2} text="Find A Full Time Opportunity" />
          <Card icon={icon_3} text="Find A Part Time Opportunity" />
          <Card icon={icon_6} text="Find A Project" />
        </div>
      </div>

      <div className="relative sm:hidden flex flex-col h-[1100px]">
        <img src={talent_1} className="h-[1100px]" />
        <h3 className=" absolute font-bold text-white top-[70px] left-1/2 -translate-x-1/2 ">
          FOR TALENT COMMUNITY
        </h3>
        <h2 className="text-3xl absolute font-bold text-white top-[130px] left-1/2 -translate-x-1/2 ">
          Find great work you are passionate about and earn on your own terms
          anytime anywhere
        </h2>
        <div className="businesscontainer w-[390px] h-[300px] grid grid-cols-2 gap-3  absolute text-white top-[400px] mt-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Card icon={icon_5} text="Create Your Talent Profile" />
          <Card icon={icon_2} text="Find A Full Time Opportunity" />
          <Card icon={icon_3} text="Find A Part Time Opportunity" />
          <Card icon={icon_6} text="Find A Project" />
        </div>
      </div>

      <div className="anotherdivfortalent sm:hidden flex flex-col bg-right">
        {" "}
      </div>
    </div>
  );
};

export default TalentContainer;
