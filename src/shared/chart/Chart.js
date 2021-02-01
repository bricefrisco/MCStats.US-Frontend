import React from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

import './chart.css';

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

    colors: ['#453750'],

    grid: {
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },

    dataLabels: {
      enabled: false,
    },

    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.35,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },

    markers: {
      strokeColor: 'rgba(255, 255, 255, 0.1)',
    },

    xaxis: {
      crosshairs: {
        stroke: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },

      tooltip: {
        enabled: false,
        style: {
          backgroundColor: 'red',
        },
      },

      axisBorder: {
        color: 'rgba(255, 255, 255, 0.2)',
      },

      labels: {
        show: true,
        datetimeUTC: false,
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
          hour: 'hh:mmtt',
          minute: 'hh:mmtt',
        },

        style: {
          colors: [
            'rgba(255, 255, 255, 0.7)',
            'rgba(255, 255, 255, 0.7)',
            'rgba(255, 255, 255, 0.7)',
            'rgba(255, 255, 255, 0.7)',
            'rgba(255, 255, 255, 0.7)',
            'rgba(255, 255, 255, 0.7)',
            'rgba(255, 255, 255, 0.7)',
            'rgba(255, 255, 255, 0.7)',
            'rgba(255, 255, 255, 0.7)',
            'rgba(255, 255, 255, 0.7)',
          ],
        },
      },

      type: 'datetime',
    },

    yaxis: {
      labels: {
        style: {
          colors: ['rgba(255, 255, 255, 0.7)'],
        },
      },
    },

    tooltip: {
      shared: false,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        return `<div>Players: ${
          series[seriesIndex][dataPointIndex]
        } <br /> Date: ${moment(
          w['config']['series'][0]['data'][dataPointIndex]['x']
        ).format('M/D hh:mm A')}</div>`;
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
