import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../reusable/Button/Button"; 

// import { useLanguageContext } from "../../../../../contexts/LanguageContext";
import { useAuthenticationContext } from "../../../contexts/AuthenticationContext";

import { useService } from "../../../hooks/useService"; 

import { userCredentialDetailsServiceFactory } from "../../../services/userCredentialDetailsService"; 

// import { BUTTON_TITLE } from "./constants/languageRelated";

export const Logout = memo(() => {
  // const { language } = useLanguageContext();

  const navigate = useNavigate();

  const { clearToken } = useAuthenticationContext();

  const userCredentialDetailsService = useService(userCredentialDetailsServiceFactory);

  const logoutHandler = async () => {
    await userCredentialDetailsService.logout();

    clearToken();

    navigate("/");
  };

  const buttonTitle = "Logout";

  return (
    <button
      title={buttonTitle}
      onClick={logoutHandler}
      // callBackFunction={logoutHandler}
      variant={"underlined"}
    />
  );
});
