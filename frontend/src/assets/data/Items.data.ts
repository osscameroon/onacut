import { LANGUAGE } from "../../constants/language";
import home from "../img/home.png"
import conseils from "../img/conseils.png"
import listes from "../img/liste.png"

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
]