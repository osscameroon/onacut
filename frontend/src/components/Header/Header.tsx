import React from 'react'
import {Box, Button, Container} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Info, List, Map} from 'react-feather'
import {useHistory} from "react-router-dom";
import LanguageSelector from "../../languageSelect";

interface HeaderProps {
    isHome?: boolean
}

const Header = (props: HeaderProps) => {
    const {isHome} = props;
    const {t} = useTranslation();
    const router = useHistory();

    return (
        <Box
            sx={{
                position: isHome ? 'fixed' : 'unset',
                width: "100%",
                zIndex: 5,
                pt: 2
            }}
        >
            <Container maxWidth={"lg"}>
                <Box
                    sx={{
                        "display": 'flex',
                        alignItems: "center",
                        gap: "6px",
                        justifyContent: "space-between"
                    }}
                >
                    <Box
                        sx={{
                            "display": 'flex',
                            alignItems: "center",
                            gap: "6px"
                        }}
                    >
                        {
                            !isHome &&
                            <Button
                                startIcon={<Map/>}
                                color={"primary"}
                                variant={"contained"}
                                onClick={() => {
                                    router.push('/');
                                }}
                            >

                                {t("label_map")}
                            </Button>
                        }

                        <Button
                            startIcon={<List/>}
                            color={"primary"}
                            variant={"contained"}
                            onClick={() => {
                                router.push('/app/list');
                            }}
                        >

                            {t("drawer_menu_list_view")}
                        </Button>
                        <Button
                            startIcon={<Info/>}
                            color={"primary"}
                            variant={"contained"}
                            onClick={() => {
                                router.push('/app/advice');
                            }}
                        >

                            {t("menu_item_advice")}
                        </Button>
                    </Box>
                    <LanguageSelector/>
                </Box>

            </Container>
        </Box>
    )
}

export default Header
