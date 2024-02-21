import { PollutionTypeResponseItem } from './pollutionType';
import { MonitoringStationResponseItem } from './monitoringStation';

export interface PollutionInfoBase {
    timestamp: string,
    value: number,
}

export interface PollutionInfoLightResponseItem extends PollutionInfoBase {
    id: number,
    pollution_type_id: number,
    monitoring_station_id: number,
}

export interface PollutionInfoFullResponseItem extends PollutionInfoBase {
    id: number,
    pollution_type: PollutionTypeResponseItem,
    monitoring_station: MonitoringStationResponseItem,
}