import { requestFactory } from "./requester";

import { HOST } from "../constants/host";

const baseUrl = `${HOST}/api/auth`;

export const userCredentialDetailsServiceFactory = (token) => {

  const request = requestFactory(token);

  return {
    register: (data) => request.post(`${baseUrl}/register/`, data),

    getOne: (userId) => request.get(`${baseUrl}/${userId}`),

    login: (data) => request.post(`${baseUrl}/login/`, data),

    updateEmail: (userId, data) =>
      request.put(`${baseUrl}/email/${userId}`, data),

    updatePassword: (userId, data) =>
      request.put(`${baseUrl}/password/${userId}`, data),

    logout: (userId) => request.get(`${baseUrl}/logout/${userId}`),
  };
};
