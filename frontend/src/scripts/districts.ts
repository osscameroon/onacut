
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

LIST_COORD.forEach((item: any) => {
    if (item.count === "Ahala") {
         coord_ahala = [item.lat, item.long]
         return
    }
    if (item.count === "Etoa") {
        coord_etoa = [item.lat, item.long]
        return
    }
    if (item.count === "Mbankomo") {
        coord_mbankomo = [item.lat, item.long]
        return
    }
    if (item.count === "Mimboman") {
        coord_mimboman = [item.lat, item.long]
        return
    }
    if (item.count === "Guider") {
        coord_guider = [item.lat, item.long]
        return
    }
    if (item.count === "Dabanga") {
        coord_dabanga = [item.lat, item.long]
        return
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
    count: count_dabanga,
    longlat: coord_dabanga
}
const guider = {
    count: count_guider,
    longlat: coord_guider
}
const etoua = {
    count: count_etoa,
    longlat: coord_etoa
}
const mbankomo = {
    count: count_mbankomo,
    longlat: coord_mbankomo
}
const mimboman = {
    count: count_mimboman,
    longlat: coord_mimboman
}
const ahala = {
    count: count_ahala,
    longlat: coord_ahala
}

export const Districts = [
    guider,
    dabanga,
    ahala,
    etoua,
    mbankomo,
    mimboman
]
