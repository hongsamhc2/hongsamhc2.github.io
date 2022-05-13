import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import Map from "../components/evcharge/map";
import ev_logo from "../resources/svg/ev_logo.svg";
import github_mark from "../resources/svg/github_mark.svg";
const EvCharge = ({}) => {
  
  return (
    <>
      <header>
        <div id="logo" className="header-item" style={{cursor:'pointer'}}>
            <Link to='/'>


          <img src={ev_logo} alt="ev charge logo"/>
            </Link>
        </div>
        <div id="title" className="header-item">
          <span>EV Charging Station</span>
        </div>
        <div id="sns" className="header-item">
          <div className="header-item">
            <a
              href="https://github.com/hongsamhc2/hiio420Project/tree/main/evcharge"
              target="_blank"
            >
              <img id="github-mark" src={github_mark} alt="github-mark" />
            </a>
          </div>
        </div>
      </header>
      <Map />
    </>
  );
};

export default EvCharge;
