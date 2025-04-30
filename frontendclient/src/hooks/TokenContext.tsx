"use client";

import {
  createContext,
  useEffect,
  PropsWithChildren,
  useState,
  useContext,
} from "react";

type TokenContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const TokenContext = createContext<TokenContextType>({
  token: null,
  setToken: () => {},
});

export const TokenProvider = ({ children }: PropsWithChildren) => {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("auth_token", newToken);
    } else {
      localStorage.removeItem("auth_token");
    }
    setTokenState(newToken);
  };

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
