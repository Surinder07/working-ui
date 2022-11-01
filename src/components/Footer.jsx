import { ArrowForward } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import {
  apple,
  facebook,
  google,
  instagram,
  linkedin,
  twitter,
  youtube,
  Globe,
  // Location,
  // logo,
} from "../assets";
import Searchbar from "./Searchbar";
import FacebookIcon from "../assets/SVG/facebookicon.svg";
import Instagram from "../assets/SVG/instagramicon.svg";
import Youtube from "../assets/SVG/youtubeicon.svg";
import Twitter from "../assets/SVG/twittericon.svg";
import LinkedIn from "../assets/SVG/linkedinicon.svg";
import Global from "../assets/SVG/globeicon.svg";
import Location from "../assets/SVG/locationicon.svg";
import logo from "../assets/SVG/logo.svg";

const emailInfo = {
  email: "waaw.management@waaw.ca",
  subject: "Subscribing For WAAW Updates",
  body: "I am interested in your services. Keep me updated.",
};

const Footer = () => {
  return (
    <div>
      <footer aria-label="Site Footer" className="bg-white">
        <div className="mx-auto max-w-7xl px-10 sm:px-6 lg:px-8">
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:flex lg:flex-row lg:gap-[96px]">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900 font-poppins">
                Company
              </p>

              <nav aria-label="Footer About Nav" className="mt-8">
                <ul className="space-y-4 text-sm">
                  <Link
                    to="/why-waaw"
                    className="text-gray-700 transition hover:text-gray-700/75 font-poppins"
                  >
                    About Us
                  </Link>

                  {/* <li>
                    <a
                      className="text-gray-700 transition hover:text-gray-700/75 font-poppins"
                      href="/"
                    >
                      Investor Relations
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-700 transition hover:text-gray-700/75 font-poppins"
                      href="/"
                    >
                      Career
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-700 transition hover:text-gray-700/75 font-poppins"
                      href="/"
                    >
                      Legal
                    </a>
                  </li> */}
                </ul>
              </nav>
            </div>

            {/* <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900 font-poppins">
                Resources
              </p>

              <nav aria-label="Footer Services Nav" className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      className="text-gray-700 transition hover:text-gray-700/75 font-poppins"
                      href="/"
                    >
                      Training Center
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-700 transition hover:text-gray-700/75 font-poppins"
                      href="/"
                    >
                      Submit A Ticket
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-700 transition hover:text-gray-700/75 font-poppins"
                      href="/"
                    >
                      How it Works
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-700 transition hover:text-gray-700/75 font-poppins"
                      href="/"
                    >
                      API Documentation
                    </a>
                  </li>
                </ul>
              </nav>
            </div> */}

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900 font-poppins">
                Mobile App
              </p>

              <div className="flex flex-row gap-4 mt-8">
                <a href="">
                  <img
                    src={apple}
                    alt="google_play"
                    className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer"
                  />
                </a>
                <a href="">
                  <img
                    src={google}
                    alt="google_play"
                    className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer"
                  />
                </a>
              </div>
            </div>

            <div className="text-center sm:text-left ">
              <p className="text-lg font-medium text-gray-900 font-poppins">
                Contact Us
              </p>

              <nav aria-label="Footer Resources Nav" className="mt-8">
                {/* <a href="mailto:waaw.management@waaw.ca" className="text-gray-700 transition hover:text-gray-700/75">waaw.management@waaw.ca</a> */}
                <a
                  href={`mailto:${emailInfo.email}?subject=${emailInfo.subject}&body=${emailInfo.body}`}
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  waaw.management@waaw.ca
                </a>

                {/* <h3 className="font-bold text-black mt-[38px] font-poppins">
                  Mobile App
                </h3>
                <div className="flex flex-row gap-4">
                  <a href="#">
                    <img
                      src={apple}
                      alt="google_play"
                      className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer"
                    />
                  </a>
                  <a href="#">
                    <img
                      src={google}
                      alt="google_play"
                      className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer"
                    />
                  </a>
                </div> */}
              </nav>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900 font-poppins">
                Subscribe us to know more
              </p>

              <nav aria-label="Footer Helpful Nav" className="mt-8 w-[350px]">
                <div className="relative max-w-lg">
                  <label className="sr-only" htmlFor="email">
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    className="outline-none w-full rounded-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium h-[47px]"
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    autoComplete="off"
                  />

                  {/* <button
                    className="absolute top-1/2 right-[0px] -translate-y-1/2 rounded-full bg-[#0091D0] px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 w-[80px]"
                    type="button"
                  >
                    {<ArrowForward />}
                  </button> */}

                  <a
                    href={`mailto:${emailInfo.email}?subject=${emailInfo.subject}&body=${emailInfo.body}`}
                    className="absolute top-1/2 right-[0px] -translate-y-1/2 rounded-full bg-[#0091D0] px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 w-[70px]"
                  >
                    {<ArrowForward />}
                  </a>
                </div>
                <h3 className="font-poppins mt-4">
                  {" "}
                  Join our team and continue your hassle free journey
                </h3>
              </nav>
            </div>
          </div>

          <div className="mt-12 text-center sm:text-left mb-[2rem]">
            <hr className=" bg-black" />
            <p className="text-lg font-medium text-gray-900 font-poppins mt-8">
              Connect Us
            </p>

            <div className="flex flex-row items-center justify-between footer-sm">
              <div className="links flex">
                <div className="mr-[18px]">
                  {" "}
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span className="sr-only">Facebook</span>
                    <img
                      src={FacebookIcon}
                      alt="facebook"
                      className="h-[25px]"
                    />
                  </a>
                </div>
                <div className="mr-[18px]">
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span className="sr-only">Instagram</span>
                    <img src={Instagram} alt="instagram" className="h-[25px]" />
                  </a>
                </div>
                <div className="mr-[18px]">
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span className="sr-only">Twitter</span>
                    <img src={Twitter} alt="twitter" className="h-[25px]" />
                  </a>
                </div>
                <div className="mr-[18px]">
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <img src={LinkedIn} alt="linkedin" className="h-[25px]" />
                  </a>
                </div>
                <div className="mr-[18px]">
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span className="sr-only">Youtube</span>
                    <img src={Youtube} alt="youtube" className="h-[25px]" />
                  </a>
                </div>
              </div>
              <div className="links flex flex-1 ml-[90px]">
                <a href="#">
                  <img
                    src={Global}
                    alt="Globe"
                    style={{
                      height: 25,
                      marginRight: 15,
                      // backgroundColor: "black",
                    }}
                  />
                </a>
                <h3 href="#" style={{ marginRight: 35 }}>
                  English
                </h3>
                <a href="#">
                  <img
                    src={Location}
                    alt="Location"
                    style={{
                      height: 25,
                      marginRight: 15,
                      // backgroundColor: "black",
                    }}
                  />
                </a>
                <h3 href="#" style={{ marginRight: 15 }}>
                  Toronto
                </h3>
              </div>

              <div>
                <a href="/">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-[163px] h-[56px] sm:flex hidden"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
