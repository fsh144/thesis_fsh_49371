export interface MonitoringStationCreateData {
    station_number: number,
    location_name: string,
    city: string,
    country: string,
    latitude: number,
    longitude: number,
}

export interface MonitoringStationResponseItem extends MonitoringStationCreateData {
    id: number,
}