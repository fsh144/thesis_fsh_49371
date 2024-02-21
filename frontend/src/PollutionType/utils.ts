import { TableHead, TableRow } from 'shared-components/Table';
import { PollutionTypeResponseItem } from 'PollutionApiDataStructure';

export const getPollutionTypeTableHead = (): TableHead[] => {
    return [
        {
            key: "name",
            label: "Pollution Type",
            tableCellProps: {},
        },
        {
            key: "displayName",
            label: "Name",
            tableCellProps: {},
        },
        {
            key: "unit",
            label: "Unit",
            tableCellProps: {},
        },
        {
            key: "description",
            label: "Description",
            tableCellProps: {},
        },
    ];

}

export const getPollutionTypeTableRows = (rawData: PollutionTypeResponseItem[]): TableRow[] => {
    return rawData.map((pollutionType) => {
        const { name, description, unit, displayName} = pollutionType;

        return {
            name: {
                tableCellProps: {},
                value: name,
            },
            description: {
                tableCellProps: {},
                value: description,
            },
            unit: {
                tableCellProps: {},
                value: unit,
            },
            displayName: {
                tableCellProps: {},
                value: displayName,
            },
        };
    });
}