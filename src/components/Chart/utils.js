import React from 'react';
import styled from "styled-components";


const LastData = styled.div`
    display: flex;
    border: 1px solid #b8b8b8;
`;
const StatLastData = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px;
`;

const properties = {
  'confirmed': 'заболели',
  'cured': 'выздоровели',
  'deaths': 'умерли'
};

export const showLastData = ({statistics}) => {
  const currentData = statistics[statistics.length - 1];
  const prevData = statistics[statistics.length - 2];
  const beforePrevData = statistics[statistics.length - 3];
  const lastDate = prevData.date.slice(5,10);
  const isUpdate = currentData.confirmed > prevData.confirmed;
  const properties = {
    'confirmed': 'заболели',
    'cured': 'выздоровели',
    'deaths': 'умерли'
  };
  if (isUpdate) {
    return (
      <div>
        <LastData>
          {Object.keys(properties).map((prop, index) => (
            <StatLastData key={`${index}.${prop}`}>
              <span><b style={{fontSize: 'larger'}}>{currentData[Object.keys(properties)[index]]}</b></span>
              <span>{Object.values(properties)[index]}</span>
              {prop === 'cured'? <span style={{color: '#ff1a1a'}}>+{currentData[prop] - prevData[prop]}</span> :
                <span style={{color: 'green'}}>+{currentData[prop] - prevData[prop]}</span>}
            </StatLastData>
          ))}
        </LastData>
      </div>
    );
  }
  else {
    return (
      <div>
        <LastData>
          {Object.keys(properties).map((prop, index) => (
            <StatLastData key={`${index}.${prop}`}>
              <span><b style={{fontSize: 'larger'}}>{prevData[Object.keys(properties)[index]]}</b></span>
              <span>{Object.values(properties)[index]}</span>
              {prop === 'cured' ?
                <span style={{color: '#ff1a1a'}}>+{prevData[prop] - beforePrevData[prop]}</span> :
                <span style={{color: 'green'}}>+{prevData[prop] - beforePrevData[prop]}</span>}
            </StatLastData>
          ))}
        </LastData>
        <span>Статистика за: <b>{lastDate}</b></span>
      </div>
    );
  }
};


export const findLocation = (data, locationName) => {
  const searchString = locationName.toLowerCase().trim();
  return data.find(el => {
    const { en, ru } = el;
    return en.toLowerCase() === searchString || ru.toLowerCase() === searchString;
  });
};
