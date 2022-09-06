import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AppNavigation } from "./constants/navigations/App.navigation";
import { RecoilRoot } from "recoil";
import './i18n';
import i18n from "./i18n";

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense
            fallback={
                <p className="text-gray-300 flex justify-center items-center pt-40 md:pt-52">
                   {i18n.t('loading')}
                </p>
            }
        >
            <RecoilRoot>
                <AppNavigation />
            </RecoilRoot>
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
