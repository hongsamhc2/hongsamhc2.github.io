import React from "react";
import { Route, Routes } from "react-router-dom";
import Test from "./pages/test";
import Main from "./pages/main";
import Meta from "./components/common/meta";
import "./resources/css/font.css";
import "./resources/css/app.css";
import "./resources/css/reset.css";
import EvCharge from "./pages/evCharge";
import Oauth from "./pages/Oauth";
import Zip from "./pages/zip";
import Tistory from "./pages/tistory/tistory";
import TistoryCallback from "./pages/tistory/tistoryCallback";
// import names from './packages/simulator/upload/json/names.json'
// import { generate } from "./packages/simulator/name";

// const a = generate(names,2)
// console.log(a)

export default function App() {
  return (
    <>
      <Meta title={"hiio420"} />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/evcharge" element={<EvCharge />} />
          <Route exact path="/oauth" element={<Oauth />} />
          <Route exact path="/zip" element={<Zip />} />
          <Route exact path="/tistory" element={<Tistory />} />
          <Route exact path="/callback/tistory" element={<TistoryCallback />} />
        </Routes>
      </div>
    </>
  );
}
