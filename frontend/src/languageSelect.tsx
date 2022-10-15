import React from "react";
import {useTranslation} from "react-i18next";
import {Box} from "@mui/material";

const LanguageSelector = () => {

    const {i18n} = useTranslation();
    const changeLanguage = () => {
        i18n.changeLanguage( i18n.language == "en" ? "fr" : "en").then();
    };

    return (
        <Box
            onClick={()=>{
                changeLanguage()
            }}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: 32,
                height: 32,
                borderRadius: '50%',
                padding: 2,
                backgroundColor: "#fff",
                cursor: "pointer",
                color: "#000"
            }}
        >
            {i18n.language.toUpperCase()}
        </Box>
    );
};
export default LanguageSelector;
