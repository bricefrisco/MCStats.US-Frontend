import React from 'react';
import ReactLoading from 'react-loading';

export const Loading = ({ type, width }) => {
  return <ReactLoading type={type} width={width} color="#453750" />;
};
