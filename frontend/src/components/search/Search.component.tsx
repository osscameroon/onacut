import React from "react";
import search from "../../assets/img/search.png";
import { LANGUAGE } from "../../constants/language";

export const Search = (props: any) => {
    return (
        <div
            style={{ width: props.width }}
            className={`flex items-center ${props.position}`}
        >
            <div className="flex border-2 mb-4 md:mb-10 border-gray-200 rounded w-full">
                <input
                    type="text"
                    className="px-4 py-2 w-10/12 lg:w-11/12"
                    placeholder={props.placeholder}
                    value={props.searchQuery}
                    onInput={(e: any) => props.setSearchQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-4 text-white flex items-center justify-center border-l w-2/12 lg:w-1/12"
                    style={{ background: "#262626" }}
                >
                    <img src={search} alt="search" className="w-6 h-auto" />
                </button>
            </div>
        </div>
    );
};
