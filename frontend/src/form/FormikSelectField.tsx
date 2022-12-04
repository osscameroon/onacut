// @flow
import * as React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectProps} from "@mui/material";
import {FormikFieldWrapper, FormikFieldWrapperProps} from "./FormikFieldWrapper";
import {useField} from "formik";
import {SelectInputProps} from "@mui/material/Select/SelectInput";

interface SelectOption {
    label: string | null,
    value: string
}

interface FormikSelectFieldProps extends Partial<SelectProps>, FormikFieldWrapperProps {
    name: string
    onChange?: SelectInputProps['onChange'];
    option: SelectOption[]
}

export const FormikSelectField = (props: FormikSelectFieldProps) => {
    const {xs, md, lg, gridClassName, ...rest} = props;

    const [field, meta,] = useField({
        name: props.name,
    });

    return (
        <FormikFieldWrapper
            xs={xs}
            md={md}
            lg={lg}
            gridClassName={gridClassName}
        >
            <FormControl
                sx={{width: "100%"}}
            >
                <InputLabel
                    id={`file_${props.name}`}
                >
                    {props.label}
                </InputLabel>
                <Select
                    {...rest}
                    labelId={`file_${props.name}`}
                    value={props.value || field.value}
                    fullWidth={props.fullWidth ?? true}
                    variant={props.variant ?? 'outlined'}
                    onChange={(e) => {
                        if (props.onChange)
                            props.onChange(e.target.value, null);
                        field.onChange(e);
                    }}
                    onBlur={e => {
                        if (props.onBlur)
                            props.onBlur(e)
                        field.onBlur(e);
                    }}
                    error={!!(meta.touched && meta.error)}
                >
                    {props.option.map((e) => (
                        <MenuItem
                            key={e.value}
                            value={e.value}
                        >
                            {e.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </FormikFieldWrapper>
    );
};