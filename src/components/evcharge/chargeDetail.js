import React, { useCallback,useEffect,useState } from "react";
import "../../resources/css/evcharge/chargeDetail.css";
import { calcDistance } from "./utils";
import close_btn from '../../resources/svg/close_btn.svg'
const ChargeDetail = ({ data = [],onOpen=()=>{},onClose}) => {
    useEffect(()=>{
        onOpen()
      window.addEventListener('popstate',onClose)

        return()=>{
            window.removeEventListener('popstate',onClose)
        }
    },[])


  const Info = useCallback(() => {
    if (data) {
      const v = data[0];
      return (
        <>
          <span>{`거리: ${calcDistance(v.distance)}`}</span>
          <span>{`주소: ${v.addr}`}</span>
          <span>{`이용 시간: ${v.useTime}`}</span>
          <span>{`전화 번호: ${v.busiCall}`}</span>
          <span>{`주차장 ${v.parkingFree==='Y'?'무료':'유료'}`}</span>
          <span>{v.note!==null&&`: ${v.note}`}</span>
        </>
      );
    } else {
      return null;
    }
  }, [data]);
  const viewList = data.map((el, i) => {

    return (
        
      <div className="modal-items" key={i}>
        <span>{`ID ${el.chgerId}`}</span>
        <span>{`${chgerType[el.chgerType]}`}</span>
        <span style={{color:`${stat[el.stat].c}`}}>{`${stat[el.stat].s}`}</span>
      </div>
    );
  });
  return (
    <>
      {data.length === 0 ? null : (
        <div id="ev-detail-modal">
            <div id="modal-back" onClick={
                ()=>{
                    onClose(true)
                }
                }></div>
          <div id="modal-contents">
            <div id="modal-header">
              <span>{data[0].statNm}</span>
              <img src={close_btn}
              onClick={() => {
                  onClose(true)

                  }} alt="close button"/>
            </div>
            <div id="modal-body">
              <div id="modal-info">
                <Info />
              </div>
              <div id="modal-list">
              {viewList}
              </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const stat={
    1: {s:'통신이상',c:'red'}, 2: {s:'충전대기',c:'green'},
3: {s:'충전중',c:'red'}, 4: {s:'운영중지',c:'red'},
5: {s:'점검중',c:'red'}, 9: {s:'상태미확인',c:'red'}

}


const chgerType={
    '01':'DC차데모',
'02': 'AC완속',
'03': 'DC차데모+AC3상',
'04': 'DC콤보',
'05': 'DC차데모+DC콤보',
'06': 'DC차데모+AC3상+DC콤보',
'07': 'AC3상'

}

export default ChargeDetail;
