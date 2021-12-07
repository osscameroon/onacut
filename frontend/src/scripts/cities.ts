import alerts from "../scripts/alerts.json"
import cities from "../scripts/city_parser/cities.json"

alerts.map((alert: any) => {
    const city = alert.ville;

    for (const key of Object.keys(cities)) {
        if (city.toLowerCase() === key) {
            const c = (cities as any)[key]
            if (!c.alerts) {
                c.alerts = {
                    count: 0,
                    districts: [],
                }
            } else {
                c.alerts.count++;
                c.alerts.districts.push(alert);
            }
        }
    }
})

export const Cities = cities;
