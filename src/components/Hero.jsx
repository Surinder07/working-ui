import React, { useState, useEffect } from "react";
import styles from "../style";
import { vector } from "../assets";
import { Searchbar } from "./";
import SearchIcon from "@mui/icons-material/Search";
import { ArrowForward, SearchOutlined } from "@mui/icons-material";
import { db } from "../firebase";

const emailInfo = {
  email: "waaw.management@waaw.ca",
  subject: "Subscribing For WAAW Updates",
  body: "I am interested in your services. Keep me updated.",
};

const Hero = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("contacts")
      .add({
        email: email,
        message: message,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY} lg:mt-6`}
    >
      <div className={`flex-1 flex items-start flex-col xl:px-0 sm:px-16 px-6`}>
        {/* <div className="flex flex-row items-center py-[6px] mb-2">
          <p className={`${styles.paragraph}`}>Coming soon</p>
        </div> */}

        <h3 className="text-3xl font-bold ">
          The world's first platform to inspire people and business to grow and
          thrive together
        </h3>
        {/* <div className="bg-[#0091D0] mt-[60px] flex flex-col justify-center align-center rounded-[25px] gap-6 px-[4rem] py-[3rem] sm:px-[11rem] sm:py-[5rem] md:px-[4rem] md:py-[3rem] lg:px-[3rem] lg:py-[4rem] searchcontainer">
          <div className="flex flex-row gap-4 justify-evenly align-center">
            <div>
              <input
                type="radio"
                name="option"
                id="1"
                className="peer hidden"
                defaultChecked
              />
              <label
                htmlFor="1"
                className="block lg:w-[9rem]  cursor-pointer select-none rounded-[25px] p-2 text-center bg-[#8AD2D1]  peer-checked:text-white peer-checked:bg-black"
              >
                Find Work
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="option"
                id="2"
                className="peer hidden"
              />
              <label
                htmlFor="2"
                className="block lg:w-[9rem] cursor-pointer select-none rounded-[25px] p-2 text-center bg-[#8AD2D1]  peer-checked:text-white peer-checked:bg-black"
              >
                Find Talent
              </label>
            </div>
          </div>
          <Searchbar
            text="Search..."
            color="gray-600"
            icon={<SearchOutlined />}
          />
        </div> */}
        <div className="bg-[#0091D0] mt-[60px] flex flex-col justify-center align-center rounded-[25px] gap-6 px-[4rem] py-[3rem] sm:px-[11rem] sm:py-[5rem] md:px-[4rem] md:py-[3rem] lg:px-[3rem] lg:py-[4rem] searchcontainer">
          <div className="text-center ">
            <p className="text-lg mb-[15px] max-w-[30ch] font-medium text-white font-poppins">
              Subscribe to stay updated, or request a service
            </p>

            <nav aria-label="Footer Helpful Nav" className="mt-2 w-[350px]">
              <div className="relative max-w-lg">
                <label className="sr-only" htmlFor="email">
                  {" "}
                  Email{" "}
                </label>

                <input
                  className="w-full outline-none text-black rounded-full caret-black border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium h-[47px]"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  className="absolute top-1/2 right-[0px] -translate-y-1/2 rounded-full bg-[#5a5555] px-5 py-3 text-sm font-medium text-white transition w-[80px]"
                  type="button"
                  onClick={handleSubmit}
                >
                  {<ArrowForward />}
                </button>
                {/* <a
                  href={`mailto:${emailInfo.email}?subject=${emailInfo.subject}&body=${emailInfo.body}`}
                  className="absolute top-1/2 right-[0px] -translate-y-1/2 rounded-full bg-[#5a5555] px-5 py-3 text-sm font-medium text-white transition w-[80px]"
                >
                  {<ArrowForward />}
                </a> */}
              </div>
            </nav>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a custom message (Optional)"
              className="mt-4 resize-none w-[95%] h-[70px] rounded-[10px] text-black bg-gray-100 outline-none p-1"
            />
          </div>
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
