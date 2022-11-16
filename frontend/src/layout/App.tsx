import React from 'react';
import {Box, Container} from "@mui/material";
import {Footer} from "../components/footer/Footer.component";
import Header from "../components/Header/Header";

interface ApplicationLayoutProps {
    children: React.ReactNode;
}

const ApplicationLayout = (props: ApplicationLayoutProps) => {
    const {children} = props;
    return (
        <>
            <Header/>
            <Container maxWidth={"lg"}>
                <Box sx={{pt: 8, pb: 4}}>
                    {children}
                </Box>
                <Footer/>
            </Container>
        </>
    )

}

export default ApplicationLayout;
