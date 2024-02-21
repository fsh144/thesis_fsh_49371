import React, {
    CSSProperties,
    useCallback,
    useMemo,
    useState,
} from 'react';
import Table from 'shared-components/Table';
import TwoOptionalSwitch from 'shared-components/TwoOptionalSwitch';
import Map from './Map';
import {
    getMapMarkers,
    getMonitoringStationTableHead,
    getMonitoringStationTableRows,
} from "./utils";
import useGetMonitoringStations from 'hooks/useGetMonitoringStations';

const styles: { [key: string]: CSSProperties } = {
    container: {
        margin: '20px 10px',
    },
    title: {
        color: 'white',
        margin: '20px 10px',
    },
    switchContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const MonitoringStation = () => {
    const [isTableView, setIsTableView] = useState(false);

    const monitoringStations = useGetMonitoringStations();

    const tableRows = useMemo(() => {
        return getMonitoringStationTableRows(monitoringStations);
    }, [monitoringStations]);

    const mapMarkers = useMemo(() => {
        return getMapMarkers(monitoringStations);
    }, [monitoringStations]);

    const handleSwitchChange = useCallback((event) => {
        setIsTableView(event.target.checked);
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Monitoring Stations</h1>
            <div style={styles.switchContainer}>
                <TwoOptionalSwitch
                    leftLabel="Map"
                    rightLabel="Table"
                    onChange={handleSwitchChange}
                />
            </div>
            {
                isTableView ? (
                    <Table
                        tableHead={getMonitoringStationTableHead()}
                        tableRows={tableRows}
                    />
                ) : (
                    <Map mapMarkers={mapMarkers} />
                )

            }
        </div>
    );
}

export default MonitoringStation;