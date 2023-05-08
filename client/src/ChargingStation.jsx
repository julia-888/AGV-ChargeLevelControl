import React, { useState } from "react";
import styled from "styled-components";

//Уровень заряда погрузчика

const ChargingStation = (props) => {
  return (
    <Station color={props.status ? "springgreen" : "tomato"}>
      <AGVNumber>
        {props.id}
      </AGVNumber>
    </Station>
  );
};

export default ChargingStation;

const Station = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: solid black 2px;
    
    margin-left: 60px;
    background-color: ${p => p.color};

    display: flex;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
  display: flex;
`

const AGVNumber = styled.div`
  /* margin: 30px 0; */
  /* margin-left: 30px; */
`