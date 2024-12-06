import { Routes, Route } from "react-router-dom";

import { Register } from "../../pages/Register/Register";
import { Login } from "../../pages/Login/Login";

export const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
};
