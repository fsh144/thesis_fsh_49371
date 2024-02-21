import React, {
    useCallback,
    useState,
    SetStateAction,
    SyntheticEvent,
} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { PollutionTypeResponseItem } from 'PollutionApiDataStructure';
import useGetPollutionTypes from "../../hooks/useGetPollutionTypes";

type dataType = PollutionTypeResponseItem | null;

interface SelectorProps {
    getPollutionType: (value: SetStateAction<dataType>) => void,
}

const PollutionTypeSelector = ({ getPollutionType } : SelectorProps) => {
    const [pollutionType, setPollutionType] = useState<dataType>(null);
    const [inputValue, setInputValue] = useState('');

    const options =  useGetPollutionTypes();

    const handleOnChange = useCallback((event: SyntheticEvent, newValue: dataType) => {
        setPollutionType(newValue);
        getPollutionType(newValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnInputChange = useCallback((event: SyntheticEvent, newInputValue: string) => {
        setInputValue(newInputValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Autocomplete
            value={pollutionType}
            onChange={handleOnChange}
            inputValue={inputValue}
            onInputChange={handleOnInputChange}
            options={options}
            sx={{
                width: 300,
                marginRight: '10px',
            }}
            getOptionLabel={(option) => option.displayName}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Pollution Type"
                    variant="filled"
                />
            )}
        />
    );
};

export default PollutionTypeSelector;