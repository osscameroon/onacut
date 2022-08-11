import React from "react";

export const Footer = () => {
    return (
        <div className="m-4 text-center md:m-8">
            <p className="text-sm text-gray-400 md:text-base">
                &copy; {new Date().getFullYear()} OSS Cameroon, All rights
                reserved.
            </p>
        </div>
    );
};
