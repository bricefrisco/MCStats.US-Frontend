import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Col } from 'react-bootstrap';

import { parseResponse } from '../../utils';
import { Chart } from '../../shared/chart';

import './server.css';

export const Server = ({ server }) => {
  const [timeseries, setTimeseries] = useState([]);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(
    moment().subtract(1, 'hours').format()
  );
  const [endDate, setEndDate] = useState(moment().format());
  const [selectedTimespan, setSelectedTimespan] = useState('1h');

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND}/timeseries?serverName=${server.name}&lt=${endDate}&gt=${startDate}`
    )
      .then(parseResponse)
      .then((response) => {
        setTimeseries([
          {
            name: 'Players',
            data: response.map((res) => ({
              x: new Date(res.date),
              y: res.playersOnline,
            })),
          },
        ]);
      })
      .catch((err) => {
        if (err === null || err === undefined) {
          setError('Unknown error occurred');
        } else {
          setError(err.toString());
        }
      });
  }, [startDate, endDate]);

  const setTimespan = (timespan) => {
    setSelectedTimespan(timespan);

    if (timespan === '1h') {
      const selectedStartDate = moment().subtract(1, 'hours').format();
      setStartDate(selectedStartDate);
      return;
    }

    if (timespan === '1d') {
      const selectedStartDate = moment().subtract(24, 'hours').format();
      setStartDate(selectedStartDate);
      return;
    }

    if (timespan === '1w') {
      const selectedStartDate = moment().subtract(1, 'week').format();
      setStartDate(selectedStartDate);
      return;
    }

    if (timespan === '1m') {
      const selectedStartDate = moment().subtract(1, 'months').format();
      setStartDate(selectedStartDate);
      return;
    }

    if (timespan === '2m') {
      const selectedStartDate = moment().subtract(2, 'months').format();
      setStartDate(selectedStartDate);
      return;
    }
  };

  return (
    <div className="server">
      <div className="server-info">
        <div className="d-flex">
          <img
            src={server.image}
            alt={`${server.name} favicon`}
            style={{ width: '64px', height: '64px' }}
          />
          <div className="ml-2">
            <h3
              style={{ fontSize: '1.17em' }}
              className="mt-0 mb-0 server-name"
            >
              {server.name}
            </h3>
            <h3 style={{ fontSize: '1.0em' }} className="mt-1 mb-1">
              {server.address}
            </h3>
            <span className="mt-1 mb-1" style={{ fontSize: '0.95em' }}>
              Players: {server.players}
            </span>
          </div>
        </div>

        <div className="timespan-selection-container">
          <span
            className={
              selectedTimespan === '1h'
                ? 'timespan-selection selected'
                : 'timespan-selection'
            }
            onClick={() => setTimespan('1h')}
          >
            1H
          </span>

          <span
            className={
              selectedTimespan === '1d'
                ? 'timespan-selection selected'
                : 'timespan-selection'
            }
            onClick={() => setTimespan('1d')}
          >
            1D
          </span>

          <span
            className={
              selectedTimespan === '1w'
                ? 'timespan-selection selected'
                : 'timespan-selection'
            }
            onClick={() => setTimespan('1w')}
          >
            1W
          </span>

          <span
            className={
              selectedTimespan === '1m'
                ? 'timespan-selection selected'
                : 'timespan-selection'
            }
            onClick={() => setTimespan('1m')}
          >
            1M
          </span>

          <span
            className={
              selectedTimespan === '2m'
                ? 'timespan-selection selected'
                : 'timespan-selection'
            }
            onClick={() => setTimespan('2m')}
          >
            2M
          </span>
        </div>
      </div>

      {timeseries.length > 0 ? (
        <Chart data={timeseries} height={150} width={500} />
      ) : (
        <div style={{ width: `500px`, height: '150px' }} />
      )}
    </div>
  );
};
