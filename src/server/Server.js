import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { parseResponse } from '../utils/api';
import { ServerChart } from '../shared/server-info';
import { Select } from '../shared/select';

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
      <img src={icon} alt={`${name} server icon`} style={{ height, width }} />
      <div className="ml-3">
        <h2>{name}</h2>
        <h5 style={{ fontWeight: '300' }}>{ip}</h5>
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
  const { serverName } = useParams();
  const [server, setServer] = useState();
  const [error, setError] = useState();
  const [timespan, setTimespan] = useState(options[0]);

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

  if (server === undefined) return <div />;

  return (
    <section id="server" className="pl-4 pt-5 pb-4">
      <Metadata
        className="d-flex ml-4"
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
        className="ml-4"
        onChange={setTimespan}
      />

      <ServerChart
        serverName={server.name}
        selectedTimespan={timespan.value}
        height={500}
        width="100%"
      />
    </section>
  );
};
