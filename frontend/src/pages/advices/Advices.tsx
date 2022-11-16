import React from "react";
import {LINKS} from "../../assets/data/Links.data";
import {Accordion} from "../../components/accordion/Accordion.component";
import {MyText} from "../../components/myText/MyText.component";
import {useTranslation} from "react-i18next";

const Advices = () => {
    const {t} = useTranslation();
    return (
        <main>
            <MyText
                variant="title"
                myText={t('title1')}
                myTextColor="text-white"
            />
            <div className="w-full md:w-3/4 py-4">
                <MyText
                    variant="normal"
                    myText={t('contents')}
                    myTextColor="text-white"
                />
            </div>
            <MyText
                variant="normal"
                myText={t('link')}
                myTextColor="text-ind"
            />
            {LINKS.map((i: any) =>  (
                <Accordion
                    title={t(i.title)}
                    content={i.content.map((item: any) => t(item))}
                />
            ))}
        </main>
    );
};

export default Advices;
