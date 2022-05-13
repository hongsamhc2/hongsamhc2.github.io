import React, { useEffect, useState, useCallback, useRef } from "react";
import "../../resources/css/evcharge/sidebar.css";
import { calcDistance } from "./utils";
import close_btn from '../../resources/svg/close_btn.svg';
import hamberger from '../../resources/svg/hamberger.svg'
const ChargeList = ({ data,onClick,current=()=>{} }) => {
  const [toggle, setToggle] = useState(true);
  const [viewLength, setViewLength] = useState(10);
  const onToggleClick = useCallback(() => {
    setToggle((p) => !p);
  }, []);

  const sidebarRef = useRef();
  useEffect(()=>{
    const resizeEvent = ()=>{
      let w = window.innerWidth
      w = parseInt(w)
      if (w<=640){
        setToggle(false)
      }else{
        setToggle(true)
      }
    }
    resizeEvent()
    window.addEventListener('resize',resizeEvent)
    return ()=>{
      window.removeEventListener('resize',resizeEvent)

    }
  },[])
  useEffect(() => {
    sidebarRef.current.scrollTo(0, sidebarRef.current.scrollHeight);
  }, [viewLength]);

  const slicedData = Object.keys(data)
    .slice(0, viewLength)
    .reduce((result, key) => {
      result[key] = data[key];
      return result;
    }, {});

  return (
    <>
      <div
        id="sidebar-header"
        style={{ left: `${toggle ? 0 : "-24rem"}` }}
      >
        
      </div>
      <div id="sidebar-toggle">
        
        <img src={toggle?close_btn:hamberger} onClick={onToggleClick} />
      </div>
      <div
        className="sidebar"
        ref={sidebarRef}
        style={{ left: `${toggle ? 0 : "-24rem"}` }}
      >
        <div
            className="sidebar-btn"
            onClick={(e) => {
              current()
            }}
          >
            <span>현재 위치에서 찾기</span>
          </div>
        <DataList data={slicedData} onClick={onClick} />
        {Object.keys(slicedData).length < Object.keys(data).length && (
          <div
            className="sidebar-btn"
            onClick={(e) => {
              setViewLength((p) => (p += 10));
            }}
          >
            <span>더보기</span>
          </div>
        )}
      </div>
    </>
  );
};

const DataList = ({ data, onClick }) => {
  const view = Object.keys(data).map((k, i) => {
    const v = data[k];
    return (
      <div className="d-list-item" key={i} onClick={(e)=>{onClick(e,v)}}>
        <span>{v[0].addr}</span>
        <span>{`${calcDistance(v[0].distance)}`}</span>
      </div>
    );
  });

  return <>{data === {} ? <div>{null}</div> : view}</>;
};

export default React.memo(ChargeList);
