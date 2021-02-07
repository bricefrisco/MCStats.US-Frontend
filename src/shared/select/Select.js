import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';

import { parseResponse } from '../../utils/api';

const formatOptions = (options) =>
  options.map((option) => ({ value: option, label: option }));

const styles = {
  option: (styles, { isFocused }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? 'rgba(0, 0, 0, 0.1)' : '#1c1b1c',
      color: isFocused ? '#9882ac' : '#fff',
      '&:active': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    };
  },
  input: (styles) => ({ ...styles, color: '#fff' }),
  menu: (styles) => ({ ...styles, backgroundColor: '#1c1b1c' }),
  valueContainer: (styles) => ({ ...styles, backgroundColor: '#1c1b1c' }),
  dropdownIndicator: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: '#1c1b1c',
    color: isFocused ? '#9882ac' : 'rgba(255, 255, 255, 0.2)',
    '&:hover': { color: '#9882ac' },
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    backgroundColor: '#1c1b1c',
  }),
  clearIndicator: (styles) => ({
    ...styles,
    backgroundColor: '#1c1b1c',
    color: 'rgba(255, 255, 255, 0.6)',
    '&:hover': { color: '#9882ac' },
  }),
  indicatorSeparator: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? '#9882ac' : 'rgba(255, 255, 255, 0.2)',
    marginBottom: '0px',
    marginTop: '0px',
  }),
  control: (styles, { isFocused }) => ({
    ...styles,
    borderColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '0px',
    '&:hover': { borderColor: '#9882ac', color: '#9882ac' },
    boxShadow: isFocused ? '0 0 3px #9882ac' : 0,
  }),
  singleValue: (styles) => ({
    ...styles,
    color: '#9882ac',
    fontWeight: '400',
  }),
};

export const Select = ({
  width = '300px',
  className,
  isSearchable,
  placeholder,
  isClearable,
  onChange,
  values,
  value,
}) => {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (values) return;
    fetch(`${process.env.REACT_APP_BACKEND}/server-names`)
      .then(parseResponse)
      .then(formatOptions)
      .then(setOptions)
      .catch((err) => {
        if (err === null || err === undefined) {
          setError('Unknown error occurred');
        } else {
          setError(err.toString());
        }
      });
  }, []);

  return (
    <div style={{ width }} className={className}>
      <ReactSelect
        value={value}
        options={values ? values : options}
        isSearchable={isSearchable}
        styles={styles}
        placeholder={placeholder}
        isClearable={isClearable}
        onChange={onChange}
      />
    </div>
  );
};
