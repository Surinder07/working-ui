import React from "react";
import styles from "../style";

const AboutUs = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`bg-primary ${styles.flexStart} h-[100vh]`}>
        <div className={`${styles.boxWidth}`}>
          about us
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
