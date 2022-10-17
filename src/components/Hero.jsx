import styles from "../style";
import { vector } from "../assets";
import { Searchbar } from "./";
import SearchIcon from "@mui/icons-material/Search";
import { SearchOutlined } from "@mui/icons-material";
const Hero = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div className={`flex-1 flex items-start flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] mb-2">
          <p className={`${styles.paragraph}`}>
            WE ARE THE WORLDS FIRST PLATFORM
          </p>
        </div>

        <h3 class="text-3xl font-bold dark:text-white">
          Designed to inspire people and business to grow and thrive together
        </h3>
        <div className="bg-[#0091D0] mt-6 flex flex-col justify-center align-center rounded-[25px] gap-6 px-[4rem] py-[3rem] sm:px-[11rem] sm:py-[5rem] md:px-[4rem] md:py-[3rem] lg:px-[8rem] lg:py-[4rem]">
          <div className="flex flex-row gap-4 justify-center align-center">
            <div>
              <input
                type="radio"
                name="option"
                id="1"
                className="peer hidden"
                checked
              />
              <label
                htmlFor="1"
                className="block  cursor-pointer select-none rounded-xl p-2 text-center bg-[#8AD2D1]  peer-checked:bg-[#F7941D] peer-checked:font-bold peer-checked:text-white"
              >
                Find Work
              </label>
            </div>
            <div>
              <input type="radio" name="option" id="2" class="peer hidden" />
              <label
                htmlFor="2"
                className="block cursor-pointer select-none rounded-xl p-2 text-center bg-[#8AD2D1]  peer-checked:bg-[#F7941D] peer-checked:font-bold peer-checked:text-white"
              >
                Find Talent
              </label>
            </div>
          </div>
          <Searchbar text="Search..." color="gray-600" icon={<SearchOutlined />} />
        </div>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <img
          src={vector}
          alt="billing"
          className="w-[100%] h-[100%] relative z-[5]"
        />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>
    </section>
  );
};

export default Hero;
