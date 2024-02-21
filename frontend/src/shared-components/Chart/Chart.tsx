import React, { useMemo } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import {ChartProps} from "./chartDataStructures";

const Chart = ({ dataSeries, categories }: ChartProps) => {

    // const series = [{
    //     data: [31, 40, 28, 51, 42, 109, 100],
    // }];
    const options = useMemo((): ApexOptions => {
        return {
            chart: {
                height: 350,
                type: 'area',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'straight',
            }
            ,
            xaxis: {
                type: 'datetime',
                categories,
            // categories: [
            //     "2018-09-19T00:00:00.000Z",
            //     "2018-09-19T01:30:00.000Z",
            //     "2018-09-19T02:30:00.000Z",
            //     "2018-09-19T03:30:00.000Z",
            //     "2018-09-19T04:30:00.000Z",
            //     "2018-09-19T05:30:00.000Z",
            //     "2018-09-19T06:30:00.000Z",
            // ],
            }
            ,
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm',
                }
                ,
            },
        };
    }, [categories]);


    return (
        <ReactApexChart
            options={options}
            series={dataSeries}
            type="area"
            width="100%"
            height="400px"
        />
    );
};

export default Chart;