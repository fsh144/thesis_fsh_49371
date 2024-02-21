export interface ChartDataSeries {
    name?: string,
    data: number[],
}

export interface ChartProps {
    dataSeries: ChartDataSeries[],
    categories: string[],
}