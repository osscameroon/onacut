export const ALERTS = require("../scripts/alerts.json")

let count_yaounde: number = 0
let count_maroua: number = 0
let count_garoua: number = 0
let count_ngaoudere: number = 0
let count_ebolowa: number = 0
let count_douala: number = 0
let count_buea: number = 0
let count_bafoussam: number = 0
let count_bertoua: number = 0
let count_bamenda: number = 0


ALERTS.map((i: any) => {
    if (i.ville === "MAROUA") {
        count_maroua += 1
        return count_maroua
    }
    if (i.ville === "GAROUA") {
        count_garoua += 1
        return count_garoua
    }
    if (i.ville === "NGAOUNDERE") {
        count_ngaoudere += 1
        return count_ngaoudere
    }
    if (i.ville === "YAOUNDE") {
        count_yaounde += 1
        return count_yaounde
    }
    if (i.ville === "DOUALA") {
        count_douala += 1
        return count_douala
    }
    if (i.ville === "BUEA") {
        count_buea += 1
        return count_buea
    }
    if (i.ville === "EBOLOWA") {
        count_ebolowa += 1
        return count_ebolowa
    }
    if (i.ville === "BAFOUSSAM") {
        count_bafoussam += 1
        return count_bafoussam
    }
    if (i.ville === "BAMENDA") {
        count_bamenda += 1
        return count_bamenda
    }
}
)

const bamenda = {
    name: count_bamenda,
    longlat: [5.914395, 10.129316]
}

const bafoussan = {
    name: count_bafoussam,
    longlat: [5.468774, 10.420834]
}

const bertoua = {
    name: count_bertoua,
    longlat: [4.558081, 13.662206]
}
const buea = {
    name: count_buea,
    longlat: [4.155587, 9.232463]
}
const douala = {
    name: count_douala,
    longlat: [4.03222, 9.706715]
}
const ebolowa = {
    name: count_ebolowa,
    longlat: [2.891746, 11.15648]
}
const garoua = {
    name: count_garoua,
    longlat: [9.278875, 13.394429]
}
const maroua = {
    name: count_maroua,
    longlat: [10.588261, 14.350791]
}
const nagoundere = {
    name: count_ngaoudere,
    longlat: [7.349664, 13.577051]
}
const yaounde = {
    name: count_yaounde,
    longlat: [3.826985, 11.495974]
}

export const LATLONG = [
    bamenda,
    bafoussan,
    bertoua,
    buea,
    douala,
    ebolowa,
    garoua,
    maroua,
    nagoundere,
    yaounde
]