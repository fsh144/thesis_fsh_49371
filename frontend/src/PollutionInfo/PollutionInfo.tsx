import React, { CSSProperties, useMemo, useState } from 'react';
import Card from '@mui/material/Card';
import { MonitoringStationResponseItem, PollutionTypeResponseItem } from 'PollutionApiDataStructure';
import useGetPollutionInfoLight from 'hooks/useGetPollutionInfoLight';
import PollutionTypeSelector from 'shared-components/PollutionTypeSelector';
import MonitoringStationSelector from 'shared-components/MonitoringStationSelector';
import Chart from 'shared-components/Chart';
import {getChartData, getTitle} from './utils';

const styles: { [key: string]: CSSProperties } = {
    container: {
        margin: '20px 10px',
    },
    title: {
        color: 'white',
        margin: '20px 10px',
    },
    chartHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 10px',
    },
    selectorContainer: {
        display: 'flex',
        alignItems: 'center',
    },
};

const PollutionInfo = () => {
    const [pollutionType, setPollutionType] = useState<PollutionTypeResponseItem | null>(null);
    const [monitoringStation, setMonitoringStation] = useState<MonitoringStationResponseItem | null>(null);

    const pollutionInfo = useGetPollutionInfoLight(pollutionType, monitoringStation);

    const title = useMemo(() => {
        return getTitle(pollutionType,monitoringStation);
    }, [pollutionType, monitoringStation]);

    const { categories, dataSeries} = useMemo(() => {
        if (pollutionInfo.length === 0 || pollutionType === null) {
            return { dataSeries: [], categories: [] };
        }
        // @ts-ignore
        return getChartData(pollutionInfo, pollutionType.displayName);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pollutionInfo]);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Pollution Info</h1>
            <Card>
                <div style={styles.chartHeader}>
                    <div style={styles.selectorContainer}>
                        <PollutionTypeSelector getPollutionType={setPollutionType} />
                        <MonitoringStationSelector getMonitoringStation={setMonitoringStation}/>
                    </div>
                    <h2>{title}</h2>
                </div>
                <Chart
                    dataSeries={dataSeries}
                    categories={categories}
                />
            </Card>
        </div>
    );
};

export default PollutionInfo;