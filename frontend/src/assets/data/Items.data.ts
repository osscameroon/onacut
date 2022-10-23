import {LANGUAGE} from "../../constants/language";
import home from "../img/home.png"
import conseils from "../img/conseils.png"
import listes from "../img/liste.png"
import report from "../img/alert.png"

export const ITEMS = [
    {
        icon: home,
        name: LANGUAGE.home.home,
        link: "/",
    },
    {
        icon: conseils,
        name: LANGUAGE.home.info,
        link: "/app/advice",
    },
    {
        icon: listes,
        name: LANGUAGE.home.vue,
        link: "/app/lists",
    },
    {
        icon: report,
        name: LANGUAGE.home.signalerPanne,
        link: "/app/add-alert",
    },
];
