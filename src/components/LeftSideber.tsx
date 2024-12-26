import { type } from "node:os";
import React from "react";

export default function LeftSideber() {
  const categories = [
    { type: "Fashion", amount: 6 },
    { type: "Technology", amount: 6 },
    { type: "Travel", amount: 8 },
    { type: "Photography", amount: 2 },
    { type: "Food", amount: 5 },
  ];

  const mycontetnts = [
    {
      type: "Fashion",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      type: "Technology",
      content:
        "Vestibulum tempus dui vitae mi malesuada, sed malesuada tellus sagittis.",
    },
    {
      type: "Travel",
      content: "Nullam et nunc at arcu ullamcorper semper at id urna.",
    },
    {
      type: "Photography",
      content:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
    {
      type: "Food",
      content:
        "Sed vel eros vel ex semper ultricies. Donec laoreet lectus non justo accumsan, vel semper nunc varius.",
    },
  ];

  return (
    <>
      {/* for desktop */}
      <div className="border-l p-3 md:block hidden">
        <div className="input-container mt-3 mx-auto">
          <input
            type="text"
            name="text"
            className="input placeholder:text-gray-500"
            placeholder="Search blog"
          />
          <span className="icon">
            <svg
              width="19px"
              height="19px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  opacity="1"
                  d="M14 5H20"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  opacity="1"
                  d="M14 8H17"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                  stroke="#000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  opacity="1"
                  d="M22 22L20 20"
                  stroke="#000"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </span>
        </div>

        {/* category */}
        <div className="mt-8 text-slate-500">
          <h2 className="mb-1 px-2 text-xl font-serif">Categories</h2>

          <div>
            {categories?.map((category, index) => (
              <div
                key={index}
                className={` px-2 hover:bg-slate-200 cursor-pointer ${
                  index !== categories.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <div className="flex flex-row items-center justify-between py-2">
                  <h5>{category?.type}</h5>
                  <h5>({category?.amount})</h5>
                </div>

                {categories.length == index - 1 ? <hr /> : ""}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-slate-500">
          <h2 className="mb-1 px-2 text-xl font-serif">My Contents</h2>

          <div>
            {mycontetnts?.map((contents, index) => (
              <div className="flex flex-row">
                <h3>{contents.type}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* for mobile */}
      <div className="fixed md:hidden border-t border-gray-400 bottom-0 w-full left-0 py-3 px-5 bg-gray-200 z-50">
        <p className="text-gray-600">this is a mobile nav</p>
      </div>
    </>
  );
}
