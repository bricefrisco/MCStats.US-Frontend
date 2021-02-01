import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

import './servers.css';

export const Header = () => {
  const [totalServers, setTotalServers] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);

  const fetchStats = () => {
    fetch(`${process.env.REACT_APP_BACKEND}/stats`)
      .then((response) => response.json())
      .then((response) => {
        setTotalServers(response.totalServers);
        setTotalPlayers(response.totalPlayers);
      });
  };

  const numberWithCommas = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    fetchStats();
    setInterval(fetchStats, 5000);
  });

  return (
    <div className="mcstats-header">
      <div className="d-flex align-items-center">
        <FontAwesomeIcon icon={faChartLine} size="3x" color="#9882ac" />
        <h1 className="mcstats-heading">MCStats</h1>
      </div>
      <p className="mcstats-subheading">
        Counting{' '}
        <span className="font-weight-bold">
          {totalPlayers === 0
            ? 'many'
            : numberWithCommas(totalPlayers.toString())}
        </span>{' '}
        players on{' '}
        <span className="font-weight-bold">
          {totalServers === 0
            ? 'many'
            : numberWithCommas(totalServers.toString())}
        </span>{' '}
        servers
      </p>
    </div>
  );
};

export default Header;
