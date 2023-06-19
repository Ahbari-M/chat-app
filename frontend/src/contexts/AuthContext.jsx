import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, { event, payload }) => {
  const { isAuthenticated, user } = payload;

  switch (event) {
    case "INITIALIZE":
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------


function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken) {
          setSession(accessToken);

          const response = await axios.get('/api/users/account');
          const { user } = response.data;

          dispatch({
            event: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            event: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          event: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (userName, password) => {
    const response = await axios.post('/api/users/signin', {
      userName,
      password,
    });
    const { accessToken, user } = response.data;
    setSession(accessToken);
    dispatch({
      event: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const register = async (userName, password) => {
    await axios.post('/api/users/signup', {
      userName,
      password,
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ event: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
