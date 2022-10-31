import React from "react";
import styles from "../style";
import AboutComponent from "../components/AboutUs";
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

      {/* here should be background svg and a name of waaw */}
      {/* <div className="bg-[#F4F2F2] h-[80vh] flex flex-col justify-center">
        <h1 className=" mt-[100px] text-3xl font-bold text-black font-[Myriad-Pro]">
          About Us
        </h1>

        <div className="mt-4">
          <p className="max-w-[700px] mt-8 text-[#686868] text-[16px] font-bold">
            Everything about the way we work at is fundamentally transforming
            around us, and the line between work and life is continually
            redrawn. Sometimes daily or hourly it seems. To survive in this
            ever-evolving world of work, you need a partner that can provide
            businesses the right tools and guidance to keep employees productive
            and connected as well as manage variable capacity efficiently.
            However, to truly thrive in this environment you also need a partner
            who has a deep understanding of not just your employees, but the
            talent available locally / globally who need to work in unison can
            truly help your business. This makes the local community you are
            serving happy and your business great.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default AboutUs;
