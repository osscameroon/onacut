import React, {useEffect} from 'react';
import NProgress from 'nprogress';
import styles from './LoadingScreen.module.css';
import {LinearProgress} from "@mui/material";

function LoadingScreen() {
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    }, []);

    return (
        <div className={styles.root}>
            <LinearProgress sx={{width: "100%", maxWidth: '320px'}} color={"primary"}/>
        </div>
    );
}

export default LoadingScreen;
