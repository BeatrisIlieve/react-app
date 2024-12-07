import { createContext, useContext, useEffect, useMemo } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

import { userCredentialDetailsServiceFactory } from "../services/userCredentialDetailsService";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [authentication, setAuthentication] = useLocalStorage(
    "authentication",
    {}
  );

  const userCredentialDetailsService = userCredentialDetailsServiceFactory(
    authentication["token"]
  );

  const resetTimer = () => {
    if (authentication) {
      clearTimeout(logoutTimer);

      logoutTimer = setTimeout(async () => {
        setAuthentication({});

        localStorage.removeItem("authentication");
        await userCredentialDetailsService.logout();
        // 600000
      }, 60000000);
    }
  };

  let logoutTimer;

  useEffect(() => {
    const handleActivity = () => {
      resetTimer();
    };

    if (authentication) {
      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keydown", handleActivity);
      window.addEventListener("scroll", handleActivity);

      resetTimer();
    }

    return () => {
      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keydown", handleActivity);
      window.addEventListener("scroll", handleActivity);

      clearTimeout(logoutTimer);
    };
  }, [authentication.token]);

  const updateAuthentication = (data) => {

    const token = data["token"];

    setAuthentication(data);
    console.log("login", authentication)
  };

  const clearToken = () => {
    localStorage.removeItem("authentication");

    setAuthentication({});
  };


  const token = authentication["token"];

  const isAuthenticated = !!authentication["token"];

  const context = useMemo(
    () => ({
      updateAuthentication,
      clearToken,
      token,
      isAuthenticated,
    }),
    [updateAuthentication, token, isAuthenticated]
  );

  return (
    <AuthenticationContext.Provider value={context}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);

  return context;
};
