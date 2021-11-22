import React from "react";
import search from "../../assets/img/search.png";

export const Search = () => {
  return (
    <div className="flex items-center">
      <div className="flex border-2 mb-4 md:mb-10 border-gray-200 rounded w-full">
        <input
          type="text"
          className="px-4 py-2 w-10/12 lg:w-11/12"
          placeholder="Search..."
        />
        <button className="px-4 text-white bg-black flex items-center justify-center border-l w-2/12 lg:w-1/12 ">
          <img src={search} alt="search" className="w-6 h-auto" />
        </button>
      </div>
    </div>
  );
};
