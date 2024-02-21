import React, {
    useCallback,
    useState,
    SetStateAction,
    SyntheticEvent,
} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MonitoringStationResponseItem } from 'PollutionApiDataStructure';
import useGetMonitoringStations from "../../hooks/useGetMonitoringStations";

type dataType = MonitoringStationResponseItem | null;

interface SelectorProps {
    getMonitoringStation: (value: SetStateAction<dataType>) => void,
}

const MonitoringStationSelector = ({ getMonitoringStation } : SelectorProps) => {
    const [monitoringStation, setMonitoringStation] = useState<dataType>(null);
    const [inputValue, setInputValue] = useState('');

    const options = useGetMonitoringStations();

    const handleOnChange = useCallback((event: SyntheticEvent, newValue: dataType) => {
        setMonitoringStation(newValue);
        getMonitoringStation(newValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnInputChange = useCallback((event: SyntheticEvent, newInputValue: string) => {
        setInputValue(newInputValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Autocomplete
            value={monitoringStation}
            onChange={handleOnChange}
            inputValue={inputValue}
            onInputChange={handleOnInputChange}
            options={options}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.location_name}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Monitoring Station"
                    variant="filled"
                />
            )}
        />
    );
};

export default MonitoringStationSelector;