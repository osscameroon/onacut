import { LANGUAGE } from "../../constants/language";
import home from "../img/home.png"
import conseils from "../img/conseils.png"
import listes from "../img/liste.png"
import language from "../img/language.png"

export const ITEMS = [
  {
    icon: home,
    name: LANGUAGE.home.home,
    link: "/"
  },
  {
    icon: conseils,
    name: LANGUAGE.home.info,
    link: "/conseils"
  },
  {
    icon: listes,
    name: LANGUAGE.home.vue,
    link: "/lists"
  },
  {
    icon: language,
    name: LANGUAGE.home.language,
    link: ""
  },
]