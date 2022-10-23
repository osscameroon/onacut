/* eslint-disable no-undef */
import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

const NODE_ENV = process.env.NODE_ENV;
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

interface PagePros {
    title: string;
    description?: string;
    image?: string;
    children: any;
}

const Page = (props: PagePros) => {
    const {title, description = '', image, children} = props;


    return (
        <Fragment>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description}/>
                {image && <meta name="image" content={image}/>}
            </Helmet>
            {children}
        </Fragment>
    );
};

export default Page;
