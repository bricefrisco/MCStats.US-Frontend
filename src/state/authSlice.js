import {createSlice} from '@reduxjs/toolkit';
import {parseResponse} from '../utils';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    loading: false,
    error: false,
    email: undefined,
    jwt: undefined,
    refreshToken: undefined,
  },

  reducers: {
    loading: (state) => {
      state.loggedIn = false;
      state.loading = true;
      state.error = false;
    },

    refreshLoading: (state) => {
      state.loading = true;
      state.error = false;
    },

    errored: (state, action) => {
      state.loggedIn = false;
      state.loading = false;
      state.error = action.payload;
    },

    loaded: (state, action) => {
      state.loggedIn = true;
      state.loading = false;
      state.error = false;
      state.email = action.payload.email;
      state.jwt = action.payload.jwt;
      state.refreshToken = action.payload.refreshToken;
    },

    logOut: (state) => {
      state.loggedIn = false;
      state.loading = false;
      state.error = false;
      state.email = undefined;
      state.jwt = undefined;
      state.refreshToken = undefined;
    },
  },
});

export const {
  loading,
  refreshLoading,
  errored,
  loaded,
  logOut,
} = authSlice.actions;

export const selectLoggedIn = (state) => state.auth.loggedIn;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export const selectEmail = (state) => state.auth.email;
export const selectJwt = (state) => state.auth.jwt;
export const selectRefreshToken = (state) => state.auth.refreshToken;

export const login = (email, password) => (dispatch) => {
  dispatch(loading());

  fetch(`${process.env.REACT_APP_BACKEND}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  })
    .then(parseResponse)
    .then((response) => {
      dispatch(
        loaded({
          email,
          jwt: response.jwt,
          refreshToken: response.refreshToken,
        })
      );
    })
    .catch((err) => {
      dispatch(
        errored(
          err === undefined || err === null
            ? 'Unknown error occurred'
            : err.toString()
        )
      );
    });
};

export const refresh = (callback) => (dispatch, getState) => {
  dispatch(refreshLoading());
  const jwt = getState().auth.jwt;
  const refreshToken = getState().auth.refreshToken;
  const email = getState().auth.email;

  fetch(`${process.env.REACT_APP_BACKEND}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jwt,
    },
    body: JSON.stringify({jwt: 'Bearer ' + jwt, refreshToken}),
  })
    .then(parseResponse)
    .then((response) => {
      dispatch(
        loaded({
          email,
          jwt: response.jwt,
          refreshToken: response.refreshToken,
        })
      );
      return response.jwt;
    })
    .then((jwt) => callback(jwt))
    .catch((err) => {
      dispatch(
        errored(
          err === undefined || err == null
            ? 'Unknown error occurred'
            : err.toString()
        )
      );
    });
};

export default authSlice.reducer;
