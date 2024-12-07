import { useMemo } from "react";

import { useAuthenticationContext } from "../contexts/AuthenticationContext";

export const useService = (serviceFactory) => {
  const { token } = useAuthenticationContext();

  const service = useMemo(() => {
    console.log("Service", token);
    return serviceFactory(token);
  }, [serviceFactory, token]);

  return service;
};
