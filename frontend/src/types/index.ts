export interface CityType {
    name?: string;
    region_id?: number;
    longitude?: number;
    lattitude?: number;
    id?: number;
    total_alerts?: number;
}

export interface RegionType {
    name?: string;
    id?: number;
    total_alerts?: number;
}

export interface DistrictType {
    name?:         string;
    id?:           number;
    city_id?:      number;
    total_alerts?: number;
}


export interface PostAlertPayload {
    observations?: string;
    type?:         string;
    date?:         Date;
    begin_time?:   string;
    region_id?:    number;
    longitude?:    number;
    lattitude?:    number;
    city_id?:      number;
    district_id?:  number;
    end_time?:     string;
}

export interface AlertType {
    observations?: string;
    type?:         string;
    date?:         Date;
    begin_time?:   string;
    region_id?:    number;
    longitude?:    number;
    lattitude?:    number;
    city_id?:      number;
    district_id?:  number;
    id?:           number;
    end_time?:     string;
    region?:       string;
    city?:         string;
    district?:     string;
}


