import React, {PureComponent} from 'react'
import * as Logic from "../Graphic/index";
import SimpleLineChart from "../Recharts/Recharts";
import styled from "styled-components";

class Graphic extends PureComponent {
  render() {
    const {placeName, isUpdate,statistics, index} = this.props;
    return (
      <RelativeForGraphics key={`${index}.${placeName}`}>
        <Name> {placeName} </Name>
        <LastStatistic>
          Сегодня:
          {Logic.showLastData(isUpdate,statistics)}
        </LastStatistic>
        <SimpleLineChart
          placeData={statistics}/>
      </RelativeForGraphics>
    )
  }
}

export default Graphic

const RelativeForGraphics = styled.div`
  position: relative;
`;
const LastStatistic = styled.div`
    position: absolute;
    display: flex;
    background: cornsilk;
    top: 24%;
    left: 20%;
    flex-direction: column;
    padding: 5px;
    border: 2px solid #eee;
    border-radius: 7px;
    color: #b5bbbb;
    
`;
const Name = styled.h4`
  text-align: center;
  color: #808088;
`;