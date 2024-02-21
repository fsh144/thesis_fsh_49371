import React from "react";
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableProps } from "./tableDataStructure";


const Table = ({ tableHead, tableRows }: TableProps) => {

    if (tableHead.length === 0
        || tableRows.length === 0
        || tableHead.length !== Object.keys(tableRows[0]).length) {
        return null;
    }

    const columnKeys = tableHead.map((column) => column.key);

    return (
        <TableContainer component={Paper}>
            <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow style={{ borderBottom: '1.5px solid #191919' }}>
                        {tableHead.map((head, headIndex) => (
                            <TableCell key={`row-${headIndex}`} {...head.tableCellProps}>{head.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows.map((row, rowIndex) => (
                        <TableRow
                            key={`row-${rowIndex}`}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:nth-of-type(odd)': {
                                    backgroundColor: '#EBEBEB',
                                },
                            }}
                        >
                            {
                                columnKeys.map((key, cellIndex) => {
                                    const { [key]: cellInfo } = row;
                                    const { tableCellProps, value } = cellInfo;

                                    return (
                                        <TableCell key={`row-${rowIndex}-cell-${cellIndex}`} {...tableCellProps}>
                                            {value}
                                        </TableCell>
                                    );
                                })
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};

export default Table;