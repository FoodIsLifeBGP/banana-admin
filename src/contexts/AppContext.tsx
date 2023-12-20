import React from 'react';

interface IAdmin {
  account_status: string;
  avatar_url: string;
  created_at: string;
  email: string;
  id: number;
  first_name: string;
  last_name: string;
  user_type: string;
}

export interface IAppContext {
  jwt?: string;
  admin?: IAdmin;
  // setJwt: React.Dispatch<React.SetStateAction<string | undefined>>;
  // setAdmin: React.Dispatch<React.SetStateAction<IAdmin | undefined>>;
}

export interface IAppContextProviderProps {
  children: React.ReactNode;
}

const AppContext = React.createContext<IAppContext | null>(null);
export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error(
      'appContext must be called from within Context Provider component.'
    );
  }
  return context;
};

export const AppContextProvider = ({ children }: IAppContextProviderProps) => {
  // const [jwt, setJwt] = React.useState<string>();
  // const [admin, setAdmin] = React.useState<IAdmin>();
  const loggedInUser = React.useRef<IAppContext>({});

  return (
    <AppContext.Provider
      // value={{ jwt: jwt, admin: admin, setJwt: setJwt, setAdmin: setAdmin }}
      value={loggedInUser.current}
    >
      {children}
    </AppContext.Provider>
  );
};
