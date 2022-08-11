import React from "react";

export const Footer = () => {
    return (
        <div className="m-4 md:m-8 text-center">
            <p className="text-sm text-gray-400 md:text-base">
                &copy; {new Date().getFullYear()} OSS Cameroon, All rights
                reserved.
            </p>
        </div>
    );
};
