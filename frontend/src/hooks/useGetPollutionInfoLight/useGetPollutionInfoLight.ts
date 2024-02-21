import { useEffect, useState } from 'react';
import usePollutionApiEndpoints from 'hooks/usePollutionApiEndpoints';
import {
    MonitoringStationResponseItem,
    PollutionInfoLightResponseItem,
    PollutionTypeResponseItem,
} from 'PollutionApiDataStructure';

const useGetPollutionInfoLight = (pollutionType: PollutionTypeResponseItem | null,
    monitoringStation: MonitoringStationResponseItem | null): PollutionInfoLightResponseItem[] => {
    const { GetAll: getPollutionInfo } = usePollutionApiEndpoints("pollution-info");
    const [pollutionInfo, setPollutionInfo] = useState<PollutionInfoLightResponseItem[]>([]);


    useEffect(() => {
        (async () => {
            try {
                if (pollutionType !== null && monitoringStation !== null) {
                    const { id: pollutionTypeId } = pollutionType;
                    const { id: monitoringStationId } = monitoringStation;

                    const queryParams = { pollution_type_id: pollutionTypeId,
                        monitoring_station_id: monitoringStationId};

                    const response = await getPollutionInfo(queryParams) || {};
                    const { data: rawData = [] }: { data: PollutionInfoLightResponseItem[] } = response;

                    setPollutionInfo(rawData);
                }
            } catch (error) {
                global.console.error(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pollutionType, monitoringStation]);

    return pollutionInfo;
};

export default useGetPollutionInfoLight;