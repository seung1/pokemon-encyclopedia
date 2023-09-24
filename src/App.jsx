import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <br />
      <br />
      <br />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pokemon-encyclopedia/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path="/pokemon-encyclopedia/pokemon/:id"
            element={<DetailPage />}
          />
          <Route path="/pokemon-encyclopedia/login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
