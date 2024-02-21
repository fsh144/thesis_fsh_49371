import {
    MonitoringStationResponseItem,
    PollutionInfoLightResponseItem,
    PollutionTypeResponseItem,
} from 'PollutionApiDataStructure';
import { ChartProps } from 'shared-components/Chart';

export const getTitle = (pollutionType: PollutionTypeResponseItem | null,
    monitoringStation: MonitoringStationResponseItem | null): string => {

    if (pollutionType === null && monitoringStation === null) {
        return 'Select location and pollution type';
    }
    if (pollutionType === null) {
        // @ts-ignore
        return `Select pollution type for ${monitoringStation.location_name}`;
    }
    if (monitoringStation === null) {
        return `Select location to check ${pollutionType.displayName}`;
    }

    return `${pollutionType.displayName} in ${monitoringStation.location_name}`;
};

export const getChartData = (pollutionInfo: PollutionInfoLightResponseItem[], pollutionName: string): ChartProps => {

    return pollutionInfo.reduce((intermediateData: ChartProps, item) => {

        const { categories, dataSeries } = intermediateData;
        const { timestamp, value } = item;

        const [firstSeries = { data: [], name: pollutionName }] = dataSeries;
        const { data } = firstSeries;

        return {
            dataSeries: [{ name: pollutionName, data: [...data, value] }],
            categories: [...categories, timestamp],
        };

    }, {
        dataSeries: [],
        categories: [],
    });
};