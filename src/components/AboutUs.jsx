import React from "react";
import styles from "../style";

const AboutUs = () => {
  return (
    <div>
      <section id="home" className={`flex flex-col ${styles.paddingY}`}>
        <h1 className="text-center text-3xl font-bold text-black ">
          Why WAAW?
        </h1>
        <div className="mt-4 max-w-[700px]">
          <p className="text-[#686868] text-[16px] font-bold">
            At WAAW, our purpose is to inspire people and business to grow and
            thrive together. We firmly believe in our mission to create economic
            opportunities, so people have better lives. As a result, we've
            become the world's first platform where everyday businesses of all
            sizes and independent talent from around the globe meet here to
            accomplish incredible things.
          </p>
          <p className="mt-8 text-[#686868] text-[16px] font-bold">
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
      </section>

      {/* <section
        id="home"
        className={`bg-[#F4F2F2] flex flex-col ${styles.paddingY}`}
      >
        <h1 className="text-center text-3xl font-bold text-black font-[Myriad-Pro]">
          About Us
        </h1>

        <div className="mt-4 ">
          <p className="max-w-[700px] text-[#686868] text-[16px] font-bold">
            WAAW Global inc is a global software company that is on a mission to
            help both business and talent community alike. Led by a team
            committed to helping businesses find more flexibility and connecting
            talent with more opportunities. We deliver on this mission through
            our flogship cloud platform WAAW by Providing hourly workplaces with
            an integrated scheduling, time tracking, team messaging and also
            talent management capabilities all in a single solution. This
            enhances the employee experience, drives better business outcomes
            and creates economic opportunities for the talent community
            worldwide. Our platform supports businesses of all sizes.
          </p>
        </div>
      </section> */}
    </div>
  );
};

export default AboutUs;
