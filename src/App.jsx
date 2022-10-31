// import styles from "./style";
// import {
//   Navbar,
//   Hero,
//   BusinessContainer,
//   TalentContainer,
//   Footer,
// } from "./components";
// import { height } from "@mui/system";
// const App = () => (
//   <div className="bg-primary w-full overflow-hidden">
//     <div className={`${styles.paddingX} ${styles.flexCenter} h-[90px]`}>
//       <div className={`${styles.boxWidth}`}>
//         <Navbar />
//       </div>
//     </div>
//     <hr className="mt-[-10px] bg-black" />

//     <div className={`bg-primary ${styles.flexStart} h-[100vh]`}>
//       <div className={`${styles.boxWidth}`}>
//         <Hero />
//       </div>
//     </div>

//     <div className={`bg-primary ${styles.flexStart} lg:h-[100vh]`}>
//       <div className={`${styles.boxWidth}`}>
//         <BusinessContainer />
//       </div>
//     </div>

//     <div className={`bg-primary ${styles.flexStart} lg:h-[100vh]`}>
//       <div className={`${styles.boxWidth}`}>
//         <TalentContainer />
//       </div>
//     </div>

//     <div className={`bg-primary ${styles.flexStart}`}>
//       <div className={`${styles.boxWidth}`}>
//         <Footer />
//       </div>
//     </div>
//   </div>
// );

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./components";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import styles from "./style";

const App = () => {
  return (
    <Router>
      <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter} h-[90px]`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
        <hr className="mt-[-10px] bg-black" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/why-waaw" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>

        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
