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
      <footer aria-label="Site Footer" class="bg-white">
        <div class="mx-auto max-w-6xl px-10 sm:px-6 lg:px-8">
          <div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div class="text-center sm:text-left">
              <p class="text-lg font-medium text-gray-900">Company</p>

              <nav aria-label="Footer About Nav" class="mt-8">
                <ul class="space-y-4 text-sm">
                  <li>
                    <a
                      class="text-gray-700 transition hover:text-gray-700/75"
                      href="/"
                    >
                      About Us
                    </a>
                  </li>

                  <li>
                    <a
                      class="text-gray-700 transition hover:text-gray-700/75"
                      href="/"
                    >
                      Investor Relations
                    </a>
                  </li>

                  <li>
                    <a
                      class="text-gray-700 transition hover:text-gray-700/75"
                      href="/"
                    >
                      Career
                    </a>
                  </li>

                  <li>
                    <a
                      class="text-gray-700 transition hover:text-gray-700/75"
                      href="/"
                    >
                      Legal
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div class="text-center sm:text-left">
              <p class="text-lg font-medium text-gray-900">Resources</p>

              <nav aria-label="Footer Services Nav" class="mt-8">
                <ul class="space-y-4 text-sm">
                  <li>
                    <a
                      class="text-gray-700 transition hover:text-gray-700/75"
                      href="/"
                    >
                      Training Center
                    </a>
                  </li>

                  <li>
                    <a
                      class="text-gray-700 transition hover:text-gray-700/75"
                      href="/"
                    >
                      Submit A Ticket
                    </a>
                  </li>

                  <li>
                    <a
                      class="text-gray-700 transition hover:text-gray-700/75"
                      href="/"
                    >
                      How it Works
                    </a>
                  </li>

                  <li>
                    <a
                      class="text-gray-700 transition hover:text-gray-700/75"
                      href="/"
                    >
                      API Documentation
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div class="text-center sm:text-left ">
              <p class="text-lg font-medium text-gray-900">Contact Us</p>

              <nav aria-label="Footer Resources Nav">
                <a href="#">waaw.management@waaw.co</a>
                <h3 className="font-bold text-black mt-[38px]">Mobile App</h3>
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

            <div class="text-center sm:text-left">
              <p class="text-lg font-medium text-gray-900">
                Subscribe us to know more
              </p>

              <nav aria-label="Footer Helpful Nav" class="mt-8">
                <div class="relative max-w-lg">
                  <label class="sr-only" for="email">
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    class="w-full rounded-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium"
                    id="email"
                    type="email"
                    placeholder="Your Email"
                  />

                  <button
                    class="absolute top-1/2 right-1 -translate-y-1/2 rounded-full bg-[#0091D0] px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                    type="button"
                  >
                    {<ArrowForward />}
                  </button>
                </div>
                <h3> Join our team and continue your hassle journey</h3>
              </nav>
            </div>
          </div>

          <div class=" text-center sm:text-left mt-[5rem]">
            <p class="text-lg font-medium text-gray-900">Connect Us</p>

            <div className="flex flex-row items-center justify-between footer-sm">
              <div className="links flex">
                <div>
                  {" "}
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    class="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span class="sr-only">Facebook</span>
                    <img src={facebook} alt="facebook" className="h-[35px]" />
                  </a>
                </div>
                <div>
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    class="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span class="sr-only">Instagram</span>
                    <img src={instagram} alt="instagram" className="h-[35px]" />
                  </a>
                </div>
                <div>
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    class="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span class="sr-only">Twitter</span>
                    <img src={twitter} alt="twitter" className="h-[35px]" />
                  </a>
                </div>
                <div>
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    class="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span class="sr-only">LinkedIn</span>
                    <img src={linkedin} alt="linkedin" className="h-[35px]" />
                  </a>
                </div>
                <div>
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    class="text-[#8AD2D1] transition hover:text-teal-700/75"
                  >
                    <span class="sr-only">Youtube</span>
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
                  className="w-[173px] h-[66px] sm:flex hidden "
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
