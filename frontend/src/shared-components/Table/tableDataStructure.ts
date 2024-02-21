import { TableCellProps } from "@mui/material/TableCell";

export interface TableHead {
    key: string,
    label: string,
    tableCellProps: TableCellProps,
}

export interface TableRowCell {
    value: string | number,
    tableCellProps: TableCellProps,
}

export interface TableRow {
    [key: string]: TableRowCell,
}

export interface TableProps {
    tableHead: TableHead[],
    tableRows: TableRow[],
}