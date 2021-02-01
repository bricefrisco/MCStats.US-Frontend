import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import { parseResponse } from '../../utils/api';
import { Server } from '../../shared/server';

import Header from './Header';

import './servers.css';

export const Servers = () => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [servers, setServers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/servers?page=${page}&pageSize=6`)
      .then(parseResponse)
      .then((response) => {
        setPage(response.number);
        setTotalPages(response.totalPages);
        setServers(response.content);
      })
      .catch((err) => {
        if (err === null || err === undefined) {
          setError('Unknown error occurred.');
        } else {
          setError(err.toString());
        }
      });
  }, [page]);

  return (
    <>
      <Header />

      <div className="container d-flex justify-content-center mt-5">
        <div className="pagination">
          <ReactPaginate
            page={page}
            pageCount={totalPages}
            onPageChange={(e) => setPage(e.selected)}
          />
        </div>
      </div>

      <div id="servers">
        {servers.map((server) => (
          <Server server={server} key={server.name} />
        ))}
      </div>
    </>
  );
};
