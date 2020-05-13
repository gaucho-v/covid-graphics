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
    top: 16%;
    left: 18%;
`;
const LocationName = styled.h3`
  text-align: center;
  font-size: larger;
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
        <LocationName>{title}</LocationName>
        <LastStatistic>
          {showLastData(location)}
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