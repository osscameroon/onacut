import React from "react";
import {AlertType} from "../../../types";
import {Box, Dialog, DialogContent, DialogTitle, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import capitalizeFirstLetter from "../../../utils/string";
import moment from "moment";
import useResponsive from "../../../hooks/useResponsive";

interface AlertDetailModalProps {
    open: boolean;
    onClose: () => void;
    alert: AlertType;
}

const AlertDetailModal = (props: AlertDetailModalProps) => {
    const {open, onClose, alert} = props;
    const {t, i18n: {language}} = useTranslation();
    moment.locale(language);

    const mobile = useResponsive('down', "sm");

    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
            maxWidth={"sm"}
            fullWidth
        >
            <DialogTitle
            >
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant={"h3"}>
                        {t("alert_detail_modal_title")}
                    </Typography>
                    <Box
                        sx={{
                            cursor: "pointer"
                        }}
                        onClick={() => onClose()}
                    >
                        <img
                            src={"/icons/close.svg"}
                            alt={""}
                        />
                    </Box>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        py: 2
                    }}
                >
                    <Stack
                        direction={mobile ? "column" : "row"}
                        alignItems={"flex-start"}
                        width={"100%"}
                        gap={"20px"}
                        sx={{
                            mb: 3
                        }}
                    >
                        <Box flex={1}>
                            <Typography
                                variant={"body2"}
                            >
                                {t('report_field_city')}
                            </Typography>
                            <Typography
                                color={"primary"}
                                variant={"body1"}
                            >
                                {capitalizeFirstLetter(alert.city ?? "")}
                            </Typography>
                        </Box>
                        <Box flex={1}>
                            <Typography
                                variant={"body2"}
                            >
                                {t('report_field_district')}
                            </Typography>
                            <Typography
                                variant={"body1"}
                                color={"primary"}
                            >
                                {capitalizeFirstLetter(alert.district ?? "")}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack
                        direction={mobile ? "column" : "row"}
                        alignItems={"flex-start"}
                        width={"100%"}
                        gap={"20px"}
                        sx={{
                            mb: 3
                        }}
                    >
                        <Box flex={1}>
                            <Typography
                                variant={"body2"}
                            >
                                {t('detail_alert_field_start_time')}
                            </Typography>
                            <Typography
                                color={"primary"}
                                variant={"body1"}
                            >
                                {moment(alert?.date ?? new Date()).format("LL")} {t("global_label_at")} {(alert?.begin_time ?? "")}
                            </Typography>
                        </Box>
                        <Box flex={1}>
                            <Typography
                                variant={"body2"}
                            >
                                {t('detail_alert_field_end_time')}
                            </Typography>
                            <Typography
                                variant={"body1"}
                                color={"primary"}
                            >
                                _______-_______
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack
                        direction={mobile ? "column" : "row"}
                        alignItems={"flex-start"}
                        width={"100%"}
                        gap={"20px"}
                        sx={{
                            mb: 3
                        }}
                    >
                        <Box flex={1}>
                            <Typography
                                variant={"body2"}
                            >
                                {t('detail_alert_field_type')}
                            </Typography>
                            <Typography
                                variant={"body1"}
                                color={"primary"}
                            >
                                {t(`label_alert_type_${alert.type ?? ""}`)}
                            </Typography>
                        </Box>
                        <Box flex={1}>
                            <Typography
                                variant={"body2"}
                            >
                                {t('detail_alert_field_description')}
                            </Typography>
                            <Typography
                                color={"primary"}
                                variant={"body1"}
                            >
                                {capitalizeFirstLetter(alert.observations ?? "")}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    )

}

export default AlertDetailModal
