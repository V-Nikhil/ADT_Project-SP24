import React from "react";
import "./App.css";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import Welcome from "./Components/Welcome";
import { useDispatch, useSelector } from "react-redux";

function App() {
  //const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className={"App" + (lightTheme ? "" : "-dark")}>
      {/* <MainContainer /> */}
      {/* <Login /> */}
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path="welcome" element={<Welcome />}></Route>
      </Routes>
    </div>
  );
}

export default App;