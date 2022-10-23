import React from 'react'
import Routes from "./routes";
import {RecoilRoot} from "recoil";
import "./index.css";


const App = () => {
    return (
        <React.Fragment>
            <RecoilRoot>
                <Routes/>
            </RecoilRoot>
        </React.Fragment>
    );
}


export default App;
