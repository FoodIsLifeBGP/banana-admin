/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, {
  useState, createContext, useMemo, useContext,
  useCallback,
} from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';
import Spinner from '../Components/Spinner/Spinner';
import ApiService from '../Services/ApiService';
import initialState from '../util/environment';

export const GlobalStateContext = createContext({
  jwt: localStorage.getItem('jwt') || '',
  admin: localStorage.getItem('user') || {},
  logIn: async ({ email, password }) => {},
  logOut: async () => {},
  showSpinner: ({ isVisible }) => {},

  /**
   * Custom Toast Notification Component
   *
   * Method:
   * - `showToast({ message, variant, header })`: Displays a toast.
   *   - `message` (string): The toast body content. Required.
   *   - `variant` (string): The toast's background color theme. Options:
   *     - `primary`: Indicates primary information or actions.
   *     - `secondary`: For less important information.
   *     - `success`: Indicates successful operations or feedback.
   *     - `danger`: Indicates errors or dangerous actions.
   *     - `warning`: For cautionary or warning messages.
   *     - `info`: For general informational messages.
   *     Default is `primary`.
   *   - `header` (string): The toast header content. Default is 'Notification'.
   *
   * Use `showToast` within components wrapped in `GlobalStateProvider` to display notifications.
   */
  showToast: () => {},
});

export const useGlobalStateContext = () => {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error('useGlobalStateContext must be used within <GlobalStateProvider/> !');
  }

  return context;
};

export function GlobalStateProvider({ children }) {
  const [jwt, setJwt] = useState(initialState.jwt);
  const [admin, setAdmin] = useState(initialState.user);
  const [isSpinnerVisible, setSpinnerVisible] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastProps, setToastProps] = useState({});

  const { axiosRequest } = ApiService();

  const storeJwtAndUser = (token, user) => {
    if (token && user) {
      localStorage.setItem('jwt', token);
      localStorage.setItem('user', JSON.stringify(user));
      setJwt(token);
      setAdmin(user);
      return true;
    }
    return false;
  };

  const logIn = async ({ email, password }) => {
    const { LOGIN_URL, USER_IDENTITY } = initialState;

    try {
      const { data, request } = await axiosRequest(
        'POST',
        LOGIN_URL,
        { [USER_IDENTITY]: { email, password } },
      );

      const user = data[USER_IDENTITY] || {};

      storeJwtAndUser(data.jwt, user);
      return request.status;
    } catch (error) {
      const e = error.toString().toLowerCase().split(' status code ');
      return e.length > 1 ? parseInt(e.slice(-1), 10) : 418;
    }
  };

  const logOut = async () => {
    setJwt('');
    setAdmin({});
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  };

  const showSpinner = useCallback((isVisible) => setSpinnerVisible(isVisible), []);

  const showToast = useCallback(({ message, variant = 'primary', header = 'Notification' }) => {
    setToastProps({ message, variant, header });
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  }, []);

  const contextProps = useMemo(() => ({
    jwt, admin, logIn, logOut, showToast, showSpinner,
  }), [jwt, admin]);

  return (
    <GlobalStateContext.Provider value={contextProps}>
      <Spinner loading={isSpinnerVisible} fullscreen />
      <div
        style={{ zIndex: 100 }}
        className={`default-animation bg-${toastProps.variant} position-fixed top-0 end-0 m-2 rounded`}
      >
        <Toast isOpen={isToastVisible}>
          <ToastHeader toggle={() => setIsToastVisible(false)}>
            {toastProps.header}
          </ToastHeader>
          <ToastBody>
            {toastProps.message}
          </ToastBody>
        </Toast>
      </div>
      {children}
    </GlobalStateContext.Provider>
  );
}
