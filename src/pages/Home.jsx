import styles from "../style";
import {
  Navbar,
  Hero,
  BusinessContainer,
  TalentContainer,
  Footer,
} from "../components";
import { height } from "@mui/system";
// import TalentContainer from "./components/TalentContainer";
// import Footer from "./components/Footer";
const Home = () => (
  <div className="bg-primary w-full overflow-hidden">
    {/* <div className={`${styles.paddingX} ${styles.flexCenter} h-[90px]`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <hr className="mt-[-10px] bg-black" /> */}

    <div className={`bg-primary ${styles.flexStart} h-[100vh]`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart} lg:h-[100vh]`}>
      <div className={`${styles.boxWidth}`}>
        <BusinessContainer />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart} lg:h-[100vh]`}>
      <div className={`${styles.boxWidth}`}>
        <TalentContainer />
      </div>
    </div>

    {/* <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Footer />
      </div>
    </div> */}
  </div>
);

export default Home;
