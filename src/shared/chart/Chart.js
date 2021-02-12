import React, { useState, useRef, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

import { parseResponse } from '../../utils';
import './chart.css';

const formatTimeseries = (timeseries) => {
  return [
    {
      name: 'Players',
      data: timeseries.map((res) => ({
        x: new Date(res.t),
        y: res.o,
      })),
    },
  ];
};

const getTimespan = (timespan) => {
  if (timespan === '1h') return moment().subtract(1, 'hours').format();
  if (timespan === '1d') return moment().subtract(24, 'hours').format();
  if (timespan === '1w') return moment().subtract(1, 'week').format();
  if (timespan === '1m') return moment().subtract(1, 'months').format();
  if (timespan === '2m') return moment().subtract(2, 'months').format();
};

const fetchTimeseries = (serverName, selectedTimespan) => {
  return fetch(
    `${
      process.env.REACT_APP_BACKEND
    }/timeseries?serverName=${serverName}&lt=${moment().format()}&gt=${getTimespan(
      selectedTimespan
    )}`
  )
    .then(parseResponse)
    .then(formatTimeseries);
};

export const ServerChart = ({
  serverName,
  selectedTimespan,
  height,
  width,
  className,
  style,
  timeseries = [],
}) => {
  const [updatedTimeseries, setUpdatedTimeseries] = useState([]);
  const intervalId = useRef(null);
  const [error, setError] = useState();

  const getTimeseries = () => {
    fetchTimeseries(serverName, selectedTimespan)
      .then((response) => {
        setUpdatedTimeseries(response);
      })
      .catch((err) => {
        if (err === null || err === undefined) {
          setError('Unknown error occurred');
        } else {
          setError(err.toString());
        }
      });
  };

  useEffect(() => {
    if (
      updatedTimeseries.length !== 0 ||
      timeseries.length === 0 ||
      selectedTimespan !== '1h'
    ) {
      getTimeseries();
    }

    intervalId.current = setInterval(getTimeseries, 60 * 1000);
    return () => clearInterval(intervalId.current);
  }, [serverName, selectedTimespan]);

  return (
    <div className={className}>
      <Chart
        data={updatedTimeseries.length === 0 ? timeseries : updatedTimeseries}
        height={height}
        width={width}
        style={style}
      />
    </div>
  );
};

export const Chart = ({ data, height, width, style }) => {
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
          colors: Array(25).fill('rgba(255, 255, 255, 0.7)'),
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
      style={style}
    />
  );
};
