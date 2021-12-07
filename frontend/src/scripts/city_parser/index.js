import { readFile, writeFile } from 'fs/promises';

const districts = JSON.parse(await readFile("../list_geo_cm.json"));
const alerts = JSON.parse(await readFile("../alerts.json"));

const bamenda = {
    name: "Bamenda",
    districts: [],
    longlat: [5.914395, 10.129316]
}

const bafoussam = {
    name: "Bafoussam",
    districts: [],
    longlat: [5.468774, 10.420834]
}

const bertoua = {
    name: "Bertoua",
    districts: [],
    longlat: [4.558081, 13.662206]
}
const buea = {
    name: "Buea",
    districts: [],
    longlat: [4.155587, 9.232463]
}
const douala = {
    name: "Douala",
    districts: [],
    longlat: [4.03222, 9.706715]
}
const ebolowa = {
    name: "Ebolowa",
    districts: [],
    longlat: [2.891746, 11.15648]
}
const garoua = {
    name: "Garoua",
    districts: [],
    longlat: [9.278875, 13.394429]
}
const maroua = {
    name: "Maroua",
    districts: [],
    longlat: [10.588261, 14.350791]
}
const ngaoundere = {
    name: "Ngaoundere",
    districts: [],
    longlat: [7.349664, 13.577051],
}

const yaounde = {
    name: "Yaounde",
    districts: [],
    longlat: [3.826985, 11.495974],
}

const cities = {
    bamenda,
    bafoussam,
    bertoua,
    buea,
    douala,
    ebolowa,
    garoua,
    maroua,
    ngaoundere,
    yaounde,
//     others: {
//         districts: [],
//     },
}


//isInRadius checks if the coordinates of `point` are in `radius`
const isInRadius = (center, point, radius = 50) => {
    return getDistanceFromLatLonInKm(center, point) < radius
}

const getDistanceFromLatLonInKm = (p1, p2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(p2.lat - p1.lat);  // deg2rad below
  var dLon = deg2rad(p2.long - p1.long);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(p1.lat)) * Math.cos(deg2rad(p2.lat)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

const deg2rad = (deg) => {
  return deg * (Math.PI/180)
}

districts.forEach((district) => {
    for (const [key, value] of Object.entries(cities)) {
        if (value.longlat && isInRadius({lat: value.longlat[0], long: value.longlat[1]}, {lat: district.lat, long: district.long})) {
            cities[key].districts.push(district)
        }
//         else {
//             cities.others.districts.push(district)
//         }
    }
})

writeFile('cities.json', JSON.stringify(cities, null, 4));

export const Cities = cities;
