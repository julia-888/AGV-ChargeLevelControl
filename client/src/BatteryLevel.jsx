import React, { useState } from "react";
import styled from "styled-components";

//Уровень заряда погрузчика

const BatteryLevel = (props) => {
  return (
    <Container>
      <AGVNumber>
        {props.id}
      </AGVNumber>
      <Battery>
        <Level bgColor={props.completed < 70 ? props.completed <=30 ? 'tomato' : 'gold' : 'springgreen'} completed={props.completed}>
          <LevelLabel>{`${props.completed}%`}</LevelLabel>
        </Level>
      </Battery>
    </Container>
  );
};
export default BatteryLevel;

const Container = styled.div`
  display: flex;
`
const AGVNumber = styled.div`
  margin: 30px 0;
  margin-left: 30px;
`
const Level = styled.div`
    height: 100%;
    width: ${p => p.completed}%;
    background-color: ${p => p.bgColor};
    border-radius: inherit;
    text-align: 'right';
`

const Battery = styled.div`
  height: 20px;
  width: 80vw;
  border: solid black 2px;
  border-radius: 50px;
  margin: 30px;
`

const LevelLabel = styled.div`
  color: black;
  font-weight: bold;
`