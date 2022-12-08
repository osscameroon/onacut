import React, {useRef} from 'react';
import {useTranslation} from "react-i18next";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {FormikDatePickerField} from "../../form/FormikDatePickerField";
import moment from "moment";
import {useRecoilValue} from "recoil";
import {CityService} from "../../services/api";
import {FormikSelectField} from "../../form/FormikSelectField";

interface CreateReportModalProps {
    open: boolean,
    onClose: any
}

const CreateReportModal = (props: CreateReportModalProps) => {
    const {t, i18n: {language}} = useTranslation();
    moment.locale(language);
    const {open, onClose} = props;
    const submitBtnRef = useRef(null);
    const regions: any = useRecoilValue(CityService.getRegions);
    const theRegions = regions.data;
    const validations = {
        type: Yup.string().required(t("global_field_require")),
        date: Yup.string().required(t("global_field_require")),
    }

    const initialValue = {password: "", conf_password: "", old_password: ""};


    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
            maxWidth={"sm"}
            fullWidth
        >
            <DialogTitle
            >
                <Typography
                    variant={"h3"}
                >
                    {t('create_report_modal_title')}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{pt: 2}}>
                    <Formik
                        initialValues={initialValue}
                        validationSchema={Yup.object().shape(validations)}
                        onSubmit={(values, formikHelpers) => {
                            console.log(values)
                        }}>
                        {({
                              setFieldTouched,
                              handleSubmit,
                          }) =>
                            <Form onSubmit={handleSubmit} className={'form'}>
                                <Grid container spacing={2}>
                                    <FormikSelectField
                                        xs={12}
                                        variant={'outlined'}
                                        label={t('report_field_type')}
                                        name={'type'}
                                        option={
                                            [
                                                {
                                                    label: t("label_alert_type_electricity"),
                                                    value: "electricity"
                                                },
                                                {
                                                    label: t("label_alert_type_internet"),
                                                    value: "internet"
                                                },
                                                {
                                                    label: t("label_alert_type_water"),
                                                    value: "water"
                                                },
                                            ]
                                        }
                                    />
                                    <FormikDatePickerField
                                        value={moment(new Date()).format("YYYY-MM-DD")}
                                        xs={12}
                                        variant={'outlined'}
                                        label={t('report_field_date')}
                                        name={'date'}
                                    />
                                    <FormikDatePickerField
                                        value={moment(new Date()).format("YYYY-MM-DD")}
                                        xs={12}
                                        variant={'outlined'}
                                        label={t('report_field_region')}
                                        name={'region_id'}
                                    />
                                    <FormikDatePickerField
                                        value={moment(new Date()).format("YYYY-MM-DD")}
                                        xs={12}
                                        variant={'outlined'}
                                        label={t('report_field_city')}
                                        name={'city_id'}
                                    />
                                    <FormikDatePickerField
                                        value={moment(new Date()).format("YYYY-MM-DD")}
                                        xs={12}
                                        variant={'outlined'}
                                        label={t('report_field_district')}
                                        name={'district_id'}
                                    />
                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            ref={submitBtnRef}
                                            type={"submit"}
                                            onClick={(e) => {
                                                Object.keys(initialValue)
                                                    .forEach(field => {
                                                        setFieldTouched(field, true);
                                                    });
                                            }}
                                            sx={{display: "none"}}
                                        />
                                    </Grid>
                                </Grid>
                            </Form>
                        }
                    </Formik>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button
                    variant={"text"}
                    color={"primary"}
                    onClick={() => onClose()}
                >
                    {t('global_label_cancel')}
                </Button>
                <Button
                    variant={"contained"}
                    color={"primary"}
                >
                    {t('global_label_save')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateReportModal
