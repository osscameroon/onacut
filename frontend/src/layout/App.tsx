import React from 'react';
import {Box} from "@mui/material";

interface ApplicationLayoutProps {
    children: React.ReactNode;
}

const ApplicationLayout = (props: ApplicationLayoutProps) => {
    const {children} = props;
    console.log("ococsdcsd")
    return (
        <Box>
            {children}
        </Box>
    )

}

export default ApplicationLayout;
