import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ServerChart} from '../chart';

import 'react-placeholder/lib/reactPlaceholder.css';
import './server.css';

export const ServerInfo = ({server}) => {
  const [selectedTimespan, setSelectedTimespan] = useState('1h');
  const [chartWidth, setChartWidth] = useState('500px');
  const [chartHeight, setChartHeight] = useState('150px');
  const [chartMargin, setChartMargin] = useState('-20px');

  const updateSize = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth > 1600) {
      setChartWidth('500px');
      setChartHeight('150px');
      return;
    }

    if (windowWidth > 1000) {
      setChartWidth('700px');
      setChartHeight('150px');
      return;
    }

    if (windowWidth > 720) {
      setChartWidth('700px');
      setChartHeight('150px');
      setChartMargin('0px');
      return;
    }

    setChartWidth(windowWidth - 30);
    setChartHeight('150px');
    setChartMargin('0px');
  };

  useEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="server">
      <div className="server-info">
        <div className="d-flex">
          <img
            src={server.image}
            alt={`${server.name} favicon`}
            style={{width: '64px', height: '64px'}}
          />
          <div className="ml-2">
            <h3
              style={{fontSize: '1.17em'}}
              className="mt-0 mb-0 server-name"
            >
              <Link to={`/servers/${server.name}`} className="link">
                {server.name}
              </Link>
            </h3>
            <h3 style={{fontSize: '1.0em'}} className="mt-1 mb-1">
              {server.address}
            </h3>
            <span className="mt-1 mb-1" style={{fontSize: '0.95em'}}>
              Players: {server.onlinePlayers}
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
            onClick={() => setSelectedTimespan('1h')}
          >
            1H
          </span>

          <span
            className={
              selectedTimespan === '1d'
                ? 'timespan-selection selected'
                : 'timespan-selection'
            }
            onClick={() => setSelectedTimespan('1d')}
          >
            1D
          </span>

          <span
            className={
              selectedTimespan === '1w'
                ? 'timespan-selection selected'
                : 'timespan-selection'
            }
            onClick={() => setSelectedTimespan('1w')}
          >
            1W
          </span>

          <span
            className={
              selectedTimespan === '1m'
                ? 'timespan-selection selected'
                : 'timespan-selection'
            }
            onClick={() => setSelectedTimespan('1m')}
          >
            1M
          </span>

          <span
            className={
              selectedTimespan === '2m'
                ? 'timespan-selection selected'
                : 'timespan-selection'
            }
            onClick={() => setSelectedTimespan('2m')}
          >
            2M
          </span>
        </div>
      </div>

      <ServerChart
        serverName={server.name}
        selectedTimespan={selectedTimespan}
        height={chartHeight}
        width={chartWidth}
        style={{marginTop: chartMargin}}
        timeseries={server.timeseries}
      />
    </div>
  );
};
