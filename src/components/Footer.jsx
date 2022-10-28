import { ArrowForward } from "@mui/icons-material";
import React from "react";
import {
  apple,
  facebook,
  google,
  instagram,
  linkedin,
  twitter,
  youtube,
  Globe,
  Location,
  logo,
} from "../assets";
import Searchbar from "./Searchbar";

const Footer = () => {
  return (
    <div>
      <footer aria-label="Site Footer" className="bg-white">
        <div className="mx-auto max-w-6xl px-10 sm:px-6 lg:px-8">
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900 font-poppins">Company</p>

              <nav aria-label="Footer About Nav" className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      className="text-gray-700 transition hover:text-gray-700/75 font-poppins"
                      href="/"
                    >
                      About Us
                    </a>
                  </li>

                  <li>
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
                  </li>
                </ul>
              </nav>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900 font-poppins">Resources</p>

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
            </div>

            <div className="text-center sm:text-left ">
              <p className="text-lg font-medium text-gray-900 font-poppins">Contact Us</p>

              <nav aria-label="Footer Resources Nav">
                <a href="#" className="font-poppins">waaw.management@waaw.ca</a>
                <h3 className="font-bold text-black mt-[38px] font-poppins">Mobile App</h3>
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
                </div>
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
                    className="w-full rounded-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium"
                    id="email"
                    type="email"
                    placeholder="Your Email"
                  />

                  <button
                    className="absolute top-1/2 right-1 -translate-y-1/2 rounded-full bg-[#0091D0] px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                    type="button"
                  >
                    {<ArrowForward />}
                  </button>
                </div>
                <h3 className="font-poppins"> Join our team and continue your hassle journey</h3>
              </nav>
            </div>
          </div>

          <div className=" text-center sm:text-left mt-[5rem] mb-[2rem]">
          <hr className=" bg-black" />
            <p className="text-lg font-medium text-gray-900 font-poppins mt-8">Connect Us</p>

            <div className="flex flex-row items-center justify-between footer-sm">
              <div className="links flex">
                <div>
                  {" "}
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span className="sr-only">Facebook</span>
                    <img src={facebook} alt="facebook" className="h-[35px]" />
                  </a>
                </div>
                <div>
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span className="sr-only">Instagram</span>
                    <img src={instagram} alt="instagram" className="h-[35px]" />
                  </a>
                </div>
                <div>
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span className="sr-only">Twitter</span>
                    <img src={twitter} alt="twitter" className="h-[35px]" />
                  </a>
                </div>
                <div>
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <img src={linkedin} alt="linkedin" className="h-[35px]" />
                  </a>
                </div>
                <div>
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span className="sr-only">Youtube</span>
                    <img src={youtube} alt="youtube" className="h-[35px]" />
                  </a>
                </div>
              </div>
              <div className="links flex">
                <a href="#">
                  <img
                    src={Globe}
                    alt="Globe"
                    style={{
                      height: 25,
                      marginRight: 25,
                      backgroundColor: "black",
                    }}
                  />
                </a>
                <h3 href="#" style={{ marginRight: 15 }}>
                  English
                </h3>
                <a href="#">
                  <img
                    src={Location}
                    alt="Location"
                    style={{
                      height: 25,
                      marginRight: 25,
                      backgroundColor: "black",
                    }}
                  />
                </a>
                <h3 href="#" style={{ marginRight: 15 }}>
                  Toronto
                </h3>
              </div>

              <div>
                <img
                  src={logo}
                  alt="hoobank"
                  className="w-[173px] h-[66px] sm:flex hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
