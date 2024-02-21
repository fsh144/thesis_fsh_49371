import React, {
    useMemo,
    CSSProperties,
} from 'react';
import useGetPollutionTypes from 'hooks/useGetPollutionTypes';
import Table from 'shared-components/Table';
import { getPollutionTypeTableHead, getPollutionTypeTableRows } from "./utils";

const styles: { [key: string]: CSSProperties } = {
    container: {
        margin: '20px 10px',
    },
    title: {
        color: 'white',
        margin: '20px 10px',
    },
};

const PollutionType = () => {
    const pollutionTypes = useGetPollutionTypes();

    const tableRows = useMemo(() => {
        return getPollutionTypeTableRows(pollutionTypes)
    }, [pollutionTypes]);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Pollution Types</h1>
            <Table
                tableHead={getPollutionTypeTableHead()}
                tableRows={tableRows}
            />
        </div>
    );
}

export default PollutionType;