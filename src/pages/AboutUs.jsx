import React from "react";
import styles from "../style";
import AboutComponent from "../components/AboutUs";
// import WhyVector from "../assets/why-vector.png"
import WhyVector from "../assets/SVG/WhyVector.svg";
const AboutUs = () => {
  return (
    <div>
      <div className="bg-primary w-full overflow-hidden">
        <div className={`bg-primary flex justify-center`}>
          <div>
            <AboutComponent />
          </div>
        </div>
      </div>
      <div className={`relative sm:flex flex-col hidden tablet:h-[600px] `}>
        <p className="mb-[-19px] font-bambino font-semibold text-[#F4F2F2] text-[410px] h-[471px] text-center">
          WAAW
        </p>
        {/* <img src={WhyVector} alt="why-vector" className="absolute bottom-0 w-[950px] font-bold text-black left-1/2 -translate-x-1/2 " /> */}
        <img src={WhyVector} alt="why-vector" className="absolute bottom-[-69px] w-[1296px] h-[664px] font-bold text-black left-[42%] -translate-x-1/2 " />

      </div>
      <section
        id="home"
        className={`bg-[#F4F2F2] flex items-center flex-col ${styles.paddingY}`}
      >
        <h1 className=" text-3xl font-bold text-black">
          About Us
        </h1>

        {/* <div className="mt-4"> */}
        <p className="max-w-[700px] mt-4 text-[#686868] text-[16px] font-bold text-justify">
          WAAW Global inc is a global software company that is on a mission to
          help both business and talent community alike. Led by a team committed
          to helping businesses find more flexibility and connecting talent with
          more opportunities. We deliver on this mission through our flogship
          cloud platform WAAW by Providing hourly workplaces with an integrated
          scheduling, time tracking, team messaging and also talent management
          capabilities all in a single solution. This enhances the employee
          experience, drives better business outcomes and creates economic
          opportunities for the talent community worldwide. Our platform
          supports businesses of all sizes.
        </p>
        {/* </div> */}
      </section>
    </div>
  );
};

export default AboutUs;
