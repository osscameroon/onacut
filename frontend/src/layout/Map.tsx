import React, {useState} from 'react';
import {Box, Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Zap} from 'react-feather'
import CreateReportModal from "../components/CreateReport/CreateReport";

interface MapLayoutProps {
    children: React.ReactNode;
}

const MapLayoutProps = (props: MapLayoutProps) => {
    const {children} = props;
    const {t} = useTranslation();
    const [openForm, setOpenForm] = useState(false);

    return (
        <Box>
            {
                openForm &&
                <CreateReportModal
                    open={openForm}
                    onClose={() => setOpenForm(false)}
                />
            }
            <Box
                sx={{
                    position: "fixed",
                    color: "primary",
                    zIndex: 5,
                    bottom: 16,
                    left: "50%",
                    transform: "translateX(-50%)"
                }}
            >
                <Button
                    startIcon={<Zap/>}
                    color={"primary"}
                    variant={"contained"}
                    onClick={() => setOpenForm(true)}
                >
                    {t("reportOutage")}
                </Button>
            </Box>
            {children}
        </Box>
    )

}

export default MapLayoutProps;
