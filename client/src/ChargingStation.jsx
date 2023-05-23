import React, { useState } from "react";
import styled from "styled-components";

//Уровень заряда погрузчика

const ChargingStation = (props) => {
  return (
    <ChargingWrap>
      <Station color={props.status ? "springgreen" : "tomato"}>
        <StationNumber>
          {props.id}
        </StationNumber>
      </Station>
      {!props.status && <div> До конца процесса зарядки осталось: {100 - props.level} %</div>}
    </ChargingWrap>
  );
};

export default ChargingStation;

const Station = styled.div`
    width: 65px;
    height: 65px;
    border-radius: 100%;
    border: solid black 2px;
    
    margin: 0 60px;
    background-color: ${p => p.color};

    display: flex;
    justify-content: center;
    align-items: center;
`


const ChargingWrap = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 30px 0 80px 0;
`

const StationNumber = styled.div`
  background: none;
  
  font-size: 20px;
`