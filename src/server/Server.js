import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {parseResponse} from '../utils/api';
import {ServerChart} from '../shared/chart';
import {Select} from '../shared/select';

const numberWithCommas = (num) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const Metadata = ({
                    icon,
                    name,
                    ip,
                    playerCount,
                    height,
                    width,
                    className,
                  }) => {
  return (
    <div className={className}>
      <img src={icon} alt={`${name} server icon`} style={{height, width}}/>
      <div className="ml-3">
        <h2>{name}</h2>
        <h5 style={{fontWeight: '300'}}>{ip}</h5>
        <p>
          Players online:{' '}
          <span className="font-weight-bold">
            {numberWithCommas(playerCount.toString())}
          </span>{' '}
        </p>
      </div>
    </div>
  );
};

const options = [
  {
    value: '1h',
    label: 'Last hour',
  },
  {
    value: '1d',
    label: 'Last day',
  },
  {
    value: '1w',
    label: 'Last week',
  },
  {
    value: '1m',
    label: 'Last month',
  },
  {
    value: '2m',
    label: 'Last two months',
  },
];

export const Server = () => {
  const {serverName} = useParams();
  const [server, setServer] = useState();
  const [error, setError] = useState();
  const [timespan, setTimespan] = useState(options[0]);
  const [chartHeight, setChartHeight] = useState('400px');

  const updateSize = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth > 1000) {
      setChartHeight('400px');
      return;
    }

    if (windowWidth > 750) {
      setChartHeight('350px');
      return;
    }

    if (windowWidth > 500) {
      setChartHeight('300px');
      return;
    }

    setChartHeight('225px');
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/server?name=${serverName}`)
      .then(parseResponse)
      .then(setServer)
      .catch((err) => {
        if (err === null || err === undefined) {
          setError('Unknown error occurred.');
        } else {
          setError(err.toString());
        }
      });
  }, [serverName]);

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
  }, []);

  if (server === undefined) return <div/>;

  return (
    <section id="server" className="pl-4 pt-5 pb-4">
      <Metadata
        className="d-flex"
        icon={server.image}
        name={server.name}
        ip={server.address}
        playerCount={server.players}
        height="100px"
        width="100px"
      />

      <Select
        value={timespan}
        values={options}
        onChange={setTimespan}
        className="mt-1"
      />

      <ServerChart
        serverName={server.name}
        selectedTimespan={timespan.value}
        height={chartHeight}
        width="100%"
        style={{marginLeft: '-30px', marginTop: '10px'}}
      />
    </section>
  );
};
