import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './header.css';

export const Header = () => {
  const [totalServers, setTotalServers] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const intervalId = useRef(null);

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
    intervalId.current = setInterval(fetchStats, 5000);
    return () => clearInterval(intervalId.current);
  }, []);

  return (
    <div className="mcstats-header">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faChartLine} size="3x" color="#9882ac" />
          <h1>
            <Link to="/server-list" className="mcstats-heading">
              MCStats
            </Link>
          </h1>
        </div>

        <a
          href="https://github.com/bricefrisco/mcstats-us-frontend"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithub} size="2x" color="#9882ac" />
        </a>
      </div>

      <h2 className="mcstats-subheading">
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
        Minecraft servers
      </h2>
    </div>
  );
};
