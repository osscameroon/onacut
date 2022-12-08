import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography
} from "@mui/material";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {FormikDatePickerField} from "../../form/FormikDatePickerField";
import moment from "moment";
import {useRecoilValue} from "recoil";
import {CityService} from "../../services/api";
import {FormikSelectField} from "../../form/FormikSelectField";
import {CityType, DistrictType, PostAlertPayload, RegionType} from "../../types";
import axios, {AxiosError} from "axios";
import {globalUrls} from "../../services/api/urls";
import {useSnackbar} from "notistack";

interface CreateReportModalProps {
    open: boolean,
    onClose: any
}

function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

interface FormState {
    region_id: number | null,
    city_id: number | null,
}

const CreateReportModal = (props: CreateReportModalProps) => {
    const {t, i18n: {language}} = useTranslation();
    moment.locale(language);
    const {open, onClose} = props;
    const submitBtnRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const [formState, setFormState] = useState<FormState>({
        region_id: null,
        city_id: null
    });

    const [cities, setCities] = useState<CityType[]>([]);
    const [districts, setDistricts] = useState<DistrictType[]>([]);

    const regionResponse = useRecoilValue(CityService.getRegions);
    const citiesResponse = useRecoilValue(CityService.getCities);
    const districtResponse = useRecoilValue(CityService.getDistricts);


    const regions: RegionType[] = regionResponse?.data ?? [];

    useEffect(() => {
        setCities((citiesResponse?.data ?? []).filter((item: CityType) => item.region_id == formState.region_id));
        setDistricts((districtResponse?.data ?? []).filter((item: DistrictType) => item.city_id == formState.city_id));
    }, [formState]);


    const validations = {
        type: Yup.string().required(t("global_field_require")),
        date: Yup.string().required(t("global_field_require")),
        region_id: Yup.string().required(t("global_field_require")),
        city_id: Yup.string().required(t("global_field_require")),
        district_id: Yup.string().required(t("global_field_require")),
    }

    const initialValue = {
        type: "electricity",
        date: "",
        region_id: "",
        city_id: "",
        district_id: "",
    };


    const handleSubmit = (payload: PostAlertPayload) => {
        setLoading(true)
        axios.post(globalUrls.POST_ALERT, payload)
            .then((response) => {
                enqueueSnackbar(t("add_alert_success_message"), {
                    variant: "success",
                });
                onClose();
            })
            .catch((error: AxiosError) => {
                enqueueSnackbar(error.message, {
                    variant: "error",
                });
            })
            .finally(() => setLoading(false))
    }

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
                        onSubmit={(values: any, formikHelpers) => {
                            const payload: PostAlertPayload = {
                                city_id: values.city_id,
                                district_id: values.district_id,
                                date: values.date.split(" ")[0],
                                begin_time: values.date.split(" ")[1],
                                region_id: values.region_id,
                                type: values.type
                            }
                            handleSubmit(payload);
                        }}>
                        {({
                              setFieldTouched,
                              handleSubmit,
                              setFieldValue,
                              errors
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
                                        value={moment(new Date()).format("YYYY-MM-DD HH:mm")}
                                        xs={12}
                                        variant={'outlined'}
                                        label={t('report_field_date')}
                                        name={'date'}
                                        onChange={(date) => {
                                            setFieldValue("date", date);
                                        }}
                                    />
                                    <FormikSelectField
                                        xs={12}
                                        variant={'outlined'}
                                        label={t('report_field_region')}
                                        name={'region_id'}
                                        onChange={(value: any) => {
                                            setFormState({...formState, region_id: value})
                                            localStorage.setItem("myRegionName", value.toString());
                                        }}
                                        option={
                                            regions.map((region, index) => {
                                                return {
                                                    label: capitalizeFirstLetter(region.name ?? ""),
                                                    value: region?.id ?? 0
                                                }
                                            })
                                        }
                                    />
                                    <FormikSelectField
                                        xs={12}
                                        variant={'outlined'}
                                        label={t('report_field_city')}
                                        name={'city_id'}
                                        onChange={(value: any) => setFormState({...formState, city_id: value})}
                                        option={
                                            cities.map((city, index) => {
                                                return {
                                                    label: capitalizeFirstLetter(city.name ?? ""),
                                                    value: city.id ?? 0
                                                }
                                            })
                                        }
                                    />
                                    <FormikSelectField
                                        xs={12}
                                        variant={'outlined'}
                                        label={t('report_field_district')}
                                        name={'district_id'}
                                        option={
                                            districts.map((district: DistrictType, index) => {
                                                return {
                                                    label: capitalizeFirstLetter(district?.name ?? ""),
                                                    value: district?.id ?? 0
                                                }
                                            })
                                        }
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
                    disabled={loading}
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => {
                        //@ts-ignore
                        submitBtnRef.current?.click()
                    }}
                >
                    {
                        loading ? <CircularProgress/> : t('global_label_save')
                    }
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateReportModal
