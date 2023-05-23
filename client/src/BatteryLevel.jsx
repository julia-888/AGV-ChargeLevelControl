import React, { useState } from "react";
import styled from "styled-components";

//Уровень заряда погрузчика

const BatteryLevel = (props) => {
  return (
    <Container>
      <AGVNumber>
        {props.id}:
      </AGVNumber>
      <Battery>
          <Level bgColor={props.status ? props.completed < 70 ? props.completed <=30 ? 'tomato' : 'gold' : 'springgreen' : 'none'} completed={props.completed}>
             <LevelLabel status={props.status}>{props.status ? `${props.completed}%` : `Заряжается у станции номер ${props.idOfStationConnected}`}</LevelLabel>
           </Level>
      </Battery>
    </Container>
  );
};
export default BatteryLevel;

const Container = styled.div`
  display: flex;
  align-items: center;
`
const AGVNumber = styled.div`
  margin: 30px 0;
  margin-left: 30px;
  width: 50px;
  font-size: 24px;
`
const Level = styled.div`
    height: 100%;
    width: ${p => p.completed}%;
    background-color: ${p => p.bgColor};
    border-radius: inherit;
    text-align: 'right';

    line-height: 35px;

    transition: 0.4s ease;
`

const Battery = styled.div`
  height: 40px;
  width: 80vw;
  border: solid black 2px;
  border-radius: 50px;
  margin: 30px;
`

const LevelLabel = styled.div`
  color: black;
  background: none;

  ${p => !p.status && `width: 80vw`};
  
`