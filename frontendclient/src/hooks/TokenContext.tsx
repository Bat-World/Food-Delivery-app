"use client";

import {
  createContext,
  useEffect,
  PropsWithChildren,
  useState,
  useContext,
} from "react";

type TokenContextType = { token: string | null };

const TokenContext = createContext<TokenContextType>({} as TokenContextType);

export const TokenProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("auth_token");
      setToken(storedToken || "");
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
