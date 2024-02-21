import { MarkerProps } from 'react-simple-maps';
import { TableHead, TableRow } from 'shared-components/Table';
import { MonitoringStationResponseItem } from 'PollutionApiDataStructure';

export const getMonitoringStationTableHead = (): TableHead[] => {
    return [
        {
            key: "country",
            label: "Country",
            tableCellProps: {},
        },
        {
            key: "city",
            label: "City",
            tableCellProps: {},
        },
        {
            key: "locationName",
            label: "Location",
            tableCellProps: {},
        },
        {
            key: "coordinates",
            label: "Coordinates",
            tableCellProps: {},
        },
    ];

};

export const getMonitoringStationTableRows = (rawData: MonitoringStationResponseItem[]): TableRow[] => {
    return rawData.map((station) => {
        const {
            country,
            city,
            location_name: locationName,
            latitude,
            longitude,
        } = station;

        return {
            country: {
                tableCellProps: { width: '10%' },
                value: country,
            },
            city: {
                tableCellProps: { width: '10%' },
                value: city,
            },
            locationName: {
                tableCellProps: {},
                value: locationName,
            },
            coordinates: {
                tableCellProps: {},
                value: `Latitude: ${latitude}, Longitude: ${longitude}`,
            },
        };
    });
};

export const getMapMarkers = (rawData: MonitoringStationResponseItem[]): MarkerProps[] => {

    const usedCoordinatesList: string[] = [];

    return rawData.reduce((currentData: MarkerProps[], station) => {
        const { longitude, latitude } = station;
        const coordinatesKey = `${longitude}${latitude}`

        if (usedCoordinatesList.includes(coordinatesKey)) {
            return currentData;
        }

        usedCoordinatesList.push(coordinatesKey);

        return [
            ...currentData,
            {
                markerOffset: -15,
                name: station.location_name,
                coordinates: [longitude, latitude],
            }];
    }, []);
};