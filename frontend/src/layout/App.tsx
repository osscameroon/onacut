import React from 'react';
import {Box} from "@mui/material";

interface ApplicationLayoutProps {
    children: React.ReactNode;
}

const ApplicationLayout = (props: ApplicationLayoutProps) => {
    const {children} = props;
    return (
        <Box>
            {children}
        </Box>
    )

}

export default ApplicationLayout;
