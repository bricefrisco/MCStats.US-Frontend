import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import { selectLoggedIn } from '../../state/authSlice';
import { parseResponse } from '../../utils/api';
import { ServerInfo } from '../../shared/server-info';
import { Select } from '../../shared/select';
import { AddServer } from '../../shared/add-server';
import { RemoveServer } from '../../shared/remove-server';

import './servers.css';

export const Servers = () => {
  const history = useHistory();
  const authenticated = useSelector(selectLoggedIn);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [servers, setServers] = useState([]);
  const [error, setError] = useState(false);

  const [showAddServerModal, setShowAddServerModal] = useState(false);
  const [showRemoveServerModal, setShowRemoveServerModal] = useState(false);
  const [showRefreshServerModal, setShowRefreshServerModal] = useState(false);

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

  const onSearch = (e) => {
    if (e === null || e === undefined || e === '') return;
    history.push(`/servers/${e.value}`);
  };

  return (
    <>
      <div className="container d-flex justify-content-center mt-5">
        <div className="pagination">
          <ReactPaginate
            page={page}
            pageCount={totalPages}
            onPageChange={(e) => setPage(e.selected)}
          />
        </div>
        <Select
          width="300px"
          className="ml-4"
          placeholder="Search..."
          isSearchable
          isClearable
          onChange={onSearch}
        />

        {authenticated && (
          <div style={{ maxHeight: '40px' }} className="ml-3">
            <Button
              className="ml-1"
              onClick={() => setShowAddServerModal(true)}
            >
              Add Server
            </Button>
            <Button
              className="ml-1"
              onClick={() => setShowRemoveServerModal(true)}
            >
              Remove Server
            </Button>
            <Button
              className="ml-1"
              onClick={() => setShowRefreshServerModal(true)}
            >
              Refresh Server
            </Button>

            <AddServer
              show={showAddServerModal}
              setShow={() => setShowAddServerModal(!showAddServerModal)}
            />

            <RemoveServer
              show={showRemoveServerModal}
              setShow={() => setShowRemoveServerModal(!showRemoveServerModal)}
            />
          </div>
        )}
      </div>

      <div id="servers">
        {servers.map((server) => (
          <ServerInfo server={server} key={server.name} />
        ))}
      </div>
    </>
  );
};
