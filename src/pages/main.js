import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import "../resources/css/main/main.css";
export default function Main(props) {

  
  return (
    <>
      <div id="main">
        <span>hiio420</span>
      </div>
      <div id="project-list">
        <span>Project</span>
        <ul>
            <li>
                <Link to="/evcharge">EV Charging Station</Link>
            </li>
        </ul>
      </div>

    </>
  );
}
