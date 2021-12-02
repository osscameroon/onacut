export const ALERTS = require("../scripts/alerts.json")

// QUARTIERS 
// 1. YAOUNDE
let count_central_hotel: number = 0
let count_nsam: number = 0;
let count_efoulan: number = 0;
let count_odza: number = 0;
let count_dakar: number = 0;
let count_shakes: number = 0;
let count_fustel: number = 0;
let count_mvan: number = 0;
let count_baseaerienne: number = 0;
// 2. MAROUA
let count_godola: number = 0;
let count_manbang: number = 0;
let count_mokolo: number = 0;
let count_waza: number = 0;
let count_kousseri: number = 0;
let count_domayo: number = 0;
let count_comice: number = 0;


console.log(ALERTS.map((i: any) => (i)))


ALERTS.map((item: any) => {
    if (item.quartier === "CENTRAL HOTEL") {
        count_central_hotel += 1
        return count_central_hotel
    }
    if (item.quartier === "NSAM") {
        count_nsam += 1
        return count_nsam
    }
    if (item.quartier === " EFOULAN") {
        count_efoulan += 1
        return count_efoulan
    }
    if (item.quartier === "ODZA") {
        count_odza += 1
        return count_odza
    }
    if (item.quartier === "DAKAR") {
        count_dakar += 1
        return count_dakar
    }
    if (item.quartier === "SHAKESPEARE") {
        count_shakes += 1
        return count_shakes
    }
    if (item.quartier === "FUSTEL") {
        count_fustel += 1
        return count_fustel
    }
    if (item.quartier === "MVAN") {
        count_mvan += 1
        return count_mvan
    }
    if (item.quartier === " BASE AERIENNE") {
        count_baseaerienne += 1
        return count_baseaerienne
    }
    // MAROUA
    if (item.quartier === "GODOLA") {
        count_godola += 1
        return count_godola
    }
    if (item.quartier === "MAMBANG") {
        count_manbang += 1
        return count_manbang
    }
    if (item.quartier === "TALA MOKOLO") {
        count_mokolo += 1
        return count_mokolo
    }
    if (item.quartier === "WAZA") {
        count_waza += 1
        return count_waza
    }
    if (item.quartier === "KOUSSERI") {
        count_kousseri += 1
        return count_kousseri
    }
    if (item.quartier === "DOMAYO ZONE INDUSTRIELLE ") {
        count_domayo += 1
        return count_domayo
    }
    if (item.quartier === "MATGENIE") {
        count_comice += 1
        return count_comice
    }
})

// 1. YAOUNDE
const central_hotel = {
    name: count_central_hotel,
    longlat: [3.8663, 11.5178]
}
const nsam = {
    name: count_nsam,
    longlat: [3.8268, 11.5078]
}
const efoulan = {
    name: count_efoulan,
    longlat: [3.9203, 12.2877]
}
const odza = {
    name: count_odza,
    longlat: [3.7635, 11.5482]
}
const dakar = {
    name: count_dakar,
    longlat: [3.8379, 11.5118]
}
const shakes = {
    name: count_shakes,
    longlat: [3.8626, 11.5718]
}
const fustel = {
    name: count_fustel,
    longlat: [3.8768, 11.5163]
}
const mvan = {
    name: count_mvan,
    longlat: [3.8227, 11.5167]
}
const baseaerienne = {
    name: count_baseaerienne,
    longlat: [3.8362, 11.5215]
}
// 1. MAROUA
const godola = {
    name: count_godola,
    longlat: [10.6993, 14.2655]
}
const mambang = {
    name: count_manbang,
    longlat: [10.6596, 14.2878]
}
const mokolo = {
    name: count_mokolo,
    longlat: [10.7411, 13.7988]
}
const waza = {
    name: count_waza,
    longlat: [11.4008, 14.5685]
}
const kousseri = {
    name: count_kousseri,
    longlat: [12.0839, 15.0250]
}
const domayo = {
    name: count_domayo,
    longlat: [10.5288, 14.2106]
}
const comice = {
    name: count_comice,
    longlat: [10.5882, 14.3194]
}

export const LATLONG = [
    // 1. Yaounde
    central_hotel,
    nsam,
    efoulan,
    odza,
    dakar,
    shakes,
    fustel,
    mvan,
    baseaerienne,
    // 2. Maroua
    godola,
    mambang,
    mokolo,
    waza,
    kousseri,
    domayo,
    comice
]