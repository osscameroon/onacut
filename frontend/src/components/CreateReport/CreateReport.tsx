import React, {useRef} from 'react';
import {useTranslation} from "react-i18next";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import {FormikTextField} from "../../form/FormikTextField";
import * as Yup from "yup";

interface CreateReportModalProps {
    open: boolean,
    onClose: any
}

const CreateReportModal = (props: CreateReportModalProps) => {
    const {t} = useTranslation();
    const {open, onClose} = props;
    const submitBtnRef = useRef(null);

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
                                    <FormikTextField
                                        xs={12}
                                        type={'text'}
                                        variant={'outlined'}
                                        label={t('report_field_type')}
                                        name={'type'}
                                    />
                                    <FormikTextField
                                        xs={12}
                                        type={'text'}
                                        variant={'outlined'}
                                        label={t('report_field_type')}
                                        name={'date'}
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
