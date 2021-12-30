export const ALERTS = require("../scripts/alerts.json")

let count_yaounde = 0
let count_maroua = 0
let count_garoua = 0
let count_ngaoudere = 0
let count_ebolowa = 0
let count_douala = 0
let count_buea = 0
let count_bafoussam = 0
let count_bertoua = 0
let count_bamenda = 0


const quartier_maroua: string[] = []
const quartier_yaounde: string[] = []
const quartier_garoua: string[] = []
const quartier_ngaoundere: string[] = []
const quartier_ebolowa: string[] = []
const quartier_douala: string[] = []
const quartier_buea: string[] = []
const quartier_bafoussam: string[] = []
const quartier_bamenda: string[] = []
const quartier_bertoua: string[] = []

const separate = "    • "

type itemVille = {
  ville: string,
  quartier: string
}

ALERTS.map((i: itemVille) => {
  if (i.ville === "MAROUA") {
    quartier_maroua.push(separate + i.quartier)
    count_maroua += 1
  }
  if (i.ville === "GAROUA") {
    count_garoua += 1
    quartier_garoua.push(i.quartier)
  }
  if (i.ville === "NGAOUNDERE") {
    count_ngaoudere += 1
    quartier_ngaoundere.push(i.quartier)
  }
  if (i.ville === "YAOUNDE") {
    count_yaounde += 1
    quartier_yaounde.push(separate + i.quartier)
  }
  if (i.ville === "DOUALA") {
    count_douala += 1
    quartier_douala.push(separate + i.quartier)
  }
  if (i.ville === "BUEA") {
    count_buea += 1
    quartier_buea.push(separate + i.quartier)
  }
  if (i.ville === "EBOLOWA") {
    count_ebolowa += 1
    quartier_ebolowa.push(i.quartier)
  }
  if (i.ville === "BAFOUSSAM") {
    count_bafoussam += 1
    quartier_bafoussam.push(separate + i.quartier)
  }
  if (i.ville === "BERTOUA") {
    count_bertoua += 1
    quartier_bertoua.push(separate + i.quartier)
  }
  if (i.ville === "BAMENDA") {
    count_bamenda += 1
    quartier_bamenda.push(separate + i.quartier)
  }
}
)

const bamenda = {
  id: "Bamenda",
  name: count_bamenda,
  quartiers: quartier_bamenda,
  longlat: [5.914395, 10.129316]
}

const bafoussam = {
  id: "Bafoussam",
  name: count_bafoussam,
  quartiers: quartier_bafoussam,
  longlat: [5.468774, 10.420834]
}

const bertoua = {
  id: "Bertoua",
  name: count_bertoua,
  quartiers: quartier_bamenda,
  longlat: [4.558081, 13.662206]
}
const buea = {
  id: "Buea",
  name: count_buea,
  quartiers: quartier_buea,
  longlat: [4.155587, 9.232463]
}
const douala = {
  id: "Douala",
  name: count_douala,
  quartiers: quartier_douala,
  longlat: [4.03222, 9.706715]
}
const ebolowa = {
  id: "Ebolowa",
  name: count_ebolowa,
  quartiers: quartier_ebolowa,
  longlat: [2.891746, 11.15648]
}
const garoua = {
  id: "Garoua",
  name: count_garoua,
  quartiers: quartier_garoua,
  longlat: [9.278875, 13.394429]
}
const maroua = {
  id: "Maroua",
  name: count_maroua,
  quartiers: quartier_maroua,
  longlat: [10.588261, 14.350791]
}
const nagoundere = {
  id: "Ngaoundere",
  name: count_ngaoudere,
  quartiers: quartier_ngaoundere,
  longlat: [7.349664, 13.577051]
}
const yaounde = {
  id: "Yaounde",
  name: count_yaounde,
  quartiers: quartier_yaounde,
  longlat: [3.826985, 11.495974]
}

export const LIST_VILLE = [
  bamenda,
  bafoussam,
  bertoua,
  buea,
  douala,
  ebolowa,
  garoua,
  maroua,
  nagoundere,
  yaounde,
]