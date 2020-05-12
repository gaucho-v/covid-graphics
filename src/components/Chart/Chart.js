import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { showLastData, findLocation } from './utils';
import LineChart from './VirusChart';
import styled from 'styled-components';


const RelativeForGraphics = styled.div`
  position: relative;
  width: calc(50% - 10px);
  margin-bottom: 10px;
  box-shadow: 2px 2px 5px 0 #0000005c;
  width: ${({isMobile}) => isMobile ? '100%' : '50%'}
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
  text-transform: capitalize;
`;

const CloseButton = styled.span`
  position: absolute;
  cursor: pointer;
  top: 5px;
  right: 5px;
`;

class Chart extends PureComponent {
  render() {
    const { location, title, onRemoveChart,isMobile } = this.props;
    return (
      <RelativeForGraphics isMobile={isMobile}>
        <CloseButton onClick={() => onRemoveChart(title)}>X</CloseButton>
        <Name>{title}</Name>
        <LastStatistic>
          {/*Сегодня:*/}
          {/*{showLastData(isUpdate, statistics)}*/}
        </LastStatistic>
        <LineChart location={location}/>
      </RelativeForGraphics>
    );
  }
}

Chart.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onRemoveChart: PropTypes.func.isRequired,
};

export default Chart;