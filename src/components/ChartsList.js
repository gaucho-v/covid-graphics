import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Chart from './Chart/Chart';
import { findLocation } from './Chart/utils';

const Graphics = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

class ChartsList extends PureComponent {
  render () {
    const { data, selected, onRemoveChart, isMobile } = this.props;
    return (
      <Graphics isMobile={isMobile}>
        {selected.map((locationName, index) => {
          const locationData = findLocation(data, locationName);
          if (!locationData) {
            return null;
          }
          return (
            <Chart key={index + locationName} location={locationData} title={locationName} onRemoveChart={onRemoveChart} isMobile={isMobile}/>
          );
        })
        }
      </Graphics>
    );
  }
}

ChartsList.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRemoveChart: PropTypes.func.isRequired
};

export default ChartsList;


