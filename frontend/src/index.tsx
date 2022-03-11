import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AppNavigation } from "./constants/navigations/App.navigation";
import { RecoilRoot } from "recoil";

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback="chargement...">
            <RecoilRoot>
                <AppNavigation />
            </RecoilRoot>
        </Suspense>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
