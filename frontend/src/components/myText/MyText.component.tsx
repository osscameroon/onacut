import React from "react";
import { TEXT_SIZE } from "../../assets/themes/globals.themes";

const TEXT_STYLE = {
    normal: "normal",
    title: "title",
    subTitle: "subTitle",
    item: "item",
};

const changeByVariant = (variant: any) => {
    if (variant === TEXT_STYLE.normal) {
        return styles.normal;
    }
    if (variant === TEXT_STYLE.title) {
        return styles.title;
    }
    if (variant === TEXT_STYLE.subTitle) {
        return styles.subTitle;
    }
    if (variant === TEXT_STYLE.item) {
        return styles.item;
    }
};

export const MyText = (props: any) => {
    const myStyle = changeByVariant(props.variant);
    return (
        <p
            className={`${props.myTextColor} ${props.textUppercase} ${props.paddingVertical} ${props.lineHeight} ${props.myTextAlign}`}
            style={myStyle}
        >
            {props.myText}
        </p>
    );
};

const styles = {
    normal: {},
    item: {
        fontSize: "13px",
    },
    title: {
        fontSize: TEXT_SIZE.title,
        fontWeight: "800",
        fontFamily: " 'Varela Round', sans-serif",
    },
    subTitle: {
        fontSize: TEXT_SIZE.subTitle,
        fontFamily: " 'Varela Round', sans-serif",
    },
};
