import React from 'react';
import {Box} from "@mui/material";

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
