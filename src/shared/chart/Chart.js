import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

import './chart.css';
import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from 'react-vis';

export const Chart = ({ data, height, width }) => {
  const options = {
    chart: {
      type: 'area',
      stacked: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {},
    xaxis: {
      labels: {
        show: false,
      },
      type: 'datetime',
    },
    tooltip: {
      shared: false,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        return `<div>Players: ${
          series[seriesIndex][dataPointIndex]
        } <br /> ${moment(data[0]['data'][dataPointIndex]['x']).format(
          'hh:mm A'
        )}</div>`;
      },
    },
    legend: {
      show: false,
    },
  };
  return (
    <ReactApexChart
      options={options}
      series={data}
      type="area"
      height={height}
      width={width}
    />
  );
};
