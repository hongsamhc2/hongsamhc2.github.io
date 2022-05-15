import React from "react";
import { Route, Routes } from "react-router-dom";
import Test from "./pages/test";
import Main from "./pages/main";
import Meta from "./components/common/meta";
import "./resources/css/font.css";
import "./resources/css/app.css";
import "./resources/css/reset.css";
import EvCharge from "./pages/evCharge";


export default function App() {
  return (
    <>
      <Meta title={"hiio420"} />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/evcharge" element={<EvCharge />} />
        </Routes>
      </div>
    </>
  );
}
