import React from 'react'
import Routes from "./routes";
import {RecoilRoot} from "recoil";
import "./index.css";
import "translations";
import ThemeProvider from "./theme";
import {SnackbarProvider} from 'notistack';

const App = () => {
    return (
        <React.Fragment>
            <RecoilRoot>
                <SnackbarProvider maxSnack={3} anchorOrigin={{horizontal: "right", vertical: "top"}}>
                    <ThemeProvider>
                        <Routes/>
                    </ThemeProvider>
                </SnackbarProvider>
            </RecoilRoot>
        </React.Fragment>
    );
}


export default App;
