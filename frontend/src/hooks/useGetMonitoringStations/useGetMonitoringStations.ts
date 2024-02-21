import { useEffect, useState } from 'react';
import { MonitoringStationResponseItem } from 'PollutionApiDataStructure';
import usePollutionApiEndpoints from 'hooks/usePollutionApiEndpoints';

const useGetMonitoringStations = (): MonitoringStationResponseItem[] => {
    const { GetAll: getMonitoringStations } = usePollutionApiEndpoints("monitoring-stations");
    const [monitoringStations, setMonitoringStations] = useState<MonitoringStationResponseItem[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getMonitoringStations() || {};
                const { data: rawData = [] }: { data: MonitoringStationResponseItem[] } = response;

                setMonitoringStations(rawData);
            } catch (error) {
                global.console.error(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return monitoringStations;
};

export default useGetMonitoringStations;