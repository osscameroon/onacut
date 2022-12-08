// @flow
import * as React from 'react';
import {BaseTextFieldProps, TextField} from "@mui/material";
import {FormikFieldWrapper, FormikFieldWrapperProps} from "./FormikFieldWrapper";
import {useField} from "formik";
import {LocalizationProvider} from "@mui/x-date-pickers";
import moment from "moment";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {useTranslation} from "react-i18next";

interface SelectOption {
    label: string | null,
    value: string
}

interface FormikDatePickerFieldProps extends Partial<BaseTextFieldProps>, FormikFieldWrapperProps {
    name: string;
    onChange?: (value: any) => void;
    maxDate?: Date
}

export const FormikDatePickerField = (props: FormikDatePickerFieldProps) => {
    const {xs, md, lg, gridClassName, ...rest} = props;
    const {i18n: {language}} = useTranslation();
    const [field, meta,] = useField({
        name: props.name,
    });

    const [value, setValue] = React.useState(props.value);

    return (
        <FormikFieldWrapper
            xs={xs}
            md={md}
            lg={lg}
            gridClassName={gridClassName}
        >
            <LocalizationProvider
                dateAdapter={AdapterMoment}
                adapterLocale={language}
            >
                <DateTimePicker
                    label={props.label}
                    value={value}
                    minDate={moment(new Date()).subtract(1, 'day').toDate()}
                    onChange={(newValue) => {
                        setValue(newValue);
                        if (props.onChange)
                            props.onChange(moment(newValue).format("YYYY-MM-DD"));

                    }}
                    maxDate={props.maxDate}
                    renderInput={
                        (params) => <TextField
                            {...params}
                            fullWidth
                            variant={props.variant}
                            error={!!(meta.touched && meta.error)}
                            helperText={meta.touched && meta.error}
                        />
                    }

                />
            </LocalizationProvider>

        </FormikFieldWrapper>
    );
};
