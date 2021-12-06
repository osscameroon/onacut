
export const ALERTS = require("../scripts/alerts.json")
export const LIST_COORD = require("../scripts/list_geo_cm.json")

// Yaounde quartier
let coord_ahala: Array<number> = []
let coord_etoa: Array<number> = []
let coord_mbankomo: Array<number> = []
let coord_mimboman: Array<number> = []
// Maroua quartier
let coord_guider: Array<number> = []
let coord_dabanga: Array<number> = []

LIST_COORD.map((item: any) => {
    if (item.name === "Ahala") {
        return coord_ahala.push(item.lat, item.long)
    }
    if (item.name === "Etoa") {
        return coord_etoa.push(item.lat, item.long)
    }
    if (item.name === "Mbankomo") {
        return coord_mbankomo.push(item.lat, item.long)
    }
    if (item.name === "Mimboman") {
        return coord_mimboman.push(item.lat, item.long)
    }
    if (item.name === "Guider") {
        return coord_guider.push(item.lat, item.long)
    }
    if (item.name === "Dabanga") {
        console.log(item.lat, item.long)
        return coord_dabanga.push(item.lat, item.long)
    }
})
let count_ahala: number = 0
let count_etoa: number = 0
let count_mbankomo: number = 0
let count_mimboman: number = 0
let count_dabanga: number = 0
let count_guider: number = 0
let count_waza: number = 0


ALERTS.map((i: any) => {
    // Quartiers
    if (i.quartier === "WAZA") {
        count_waza += 1
        return count_waza
    }
    if (i.quartier === "GUIDER VILLE") {
        count_guider += 1
        return count_guider
    }
    if (i.quartier === "DABANGA") {
        count_dabanga += 1
        return count_dabanga
    }
    if (i.quartier === "ETOA") {
        count_etoa += 1
        return count_etoa
    }
    if (i.quartier === "MBANKOMO") {
        count_mbankomo += 1
        return count_mbankomo
    }
    if (i.quartier === "MIMBOMAN") {
        count_mimboman += 1
        return count_mimboman
    }
    if (i.quartier === "AHALA VILLAGE") {
        count_ahala += 1
        return count_ahala
    }
}
)

const dabanga = {
    name: count_dabanga,
    longlat: coord_dabanga
}
const guider = {
    name: count_guider,
    longlat: coord_guider
}
const etoua = {
    name: count_ahala,
    longlat: coord_etoa
}
const mbankomo = {
    name: count_mbankomo,
    longlat: coord_mbankomo
}
const mimboman = {
    name: count_mimboman,
    longlat: coord_mimboman
}
const ahala = {
    name: count_ahala,
    longlat: coord_ahala
}

export const LIST_QUARTIER = [
    guider,
    dabanga,
    ahala,
    etoua,
    mbankomo,
    mimboman
]