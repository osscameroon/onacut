import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AppNavigation } from "./constants/navigations/App.navigation";
import { RecoilRoot } from "recoil";
import { LANGUAGE } from "./constants/language";

ReactDOM.render(
    <React.StrictMode>
        <Suspense
            fallback={
                <p className="text-gray-300 flex justify-center items-center pt-40 md:pt-52">
                    {LANGUAGE.loading}
                </p>
            }
        >
            <RecoilRoot>
                <AppNavigation />
            </RecoilRoot>
        </Suspense>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
