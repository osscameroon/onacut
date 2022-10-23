import { atom } from "recoil";

export const modalState = atom({
    key: "modal-state",
    default: "open"
})

export const panneBtnState = atom({
    key: "panne_btn_state",
    default: 10
})

export const zoomLevelState = atom({
    key: "zoom_level_state",
    default: 7
})
