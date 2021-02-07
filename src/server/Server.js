import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { parseResponse } from '../utils/api';
import { ServerChart } from '../shared/server-info';

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

export const Server = () => {
  const { serverName } = useParams();
  const [server, setServer] = useState();
  const [error, setError] = useState();
  const [timespan, setTimespan] = useState('1h');

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
        icon={server.image}
        name={server.name}
        ip={server.address}
        playerCount={server.players}
        height="100px"
        width="100px"
        className="d-flex ml-4"
      />

      <ServerChart
        serverName={server.name}
        selectedTimespan={timespan}
        height={500}
        width="100%"
      />
    </section>
  );
};
