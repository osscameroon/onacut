import React from 'react';
import {Box} from "@mui/material";
import {Header} from "components";

interface MapLayoutProps {
    children: React.ReactNode;
}

const MapLayoutProps = (props: MapLayoutProps) => {
    const {children} = props;


    return (
        <Box>
            {children}
        </Box>
    )

}

export default MapLayoutProps;
