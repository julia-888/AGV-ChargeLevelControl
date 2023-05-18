import React, { useState } from "react";
import styled from "styled-components";

//Уровень заряда погрузчика

const ChargingStation = (props) => {
  return (
    <ChargingWrap>
      <Station color={props.status ? "springgreen" : "tomato"}>
        <AGVNumber>
          {props.id}
        </AGVNumber>
      </Station>
      {props.status && <span> До конца зарядки осталос: 45 %</span>}
    </ChargingWrap>
  );
};

export default ChargingStation;

const Station = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: solid black 2px;
    
    margin-left: 60px;
    margin-bottom: 30px;
    background-color: ${p => p.color};

    display: flex;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
  display: flex;
`

const ChargingWrap = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin: 30px 0 80px 0;
`

const AGVNumber = styled.div`
  /* margin: 30px 0; */
  /* margin-left: 30px; */
`