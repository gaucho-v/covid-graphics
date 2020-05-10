import React from 'react';

export const showLastData = (isUpdate, statistics) => {
  const currentData = statistics[statistics.length - 1];
  const prevData = statistics[statistics.length - 2];
  const beforePrevData = statistics[statistics.length - 3];
  const properties = ['confirmed', 'cured', 'deaths'];
  if (isUpdate) {
    return (
      <div>
        {properties.map((prop, index) => (
          <div key={`${index}.${prop}`}>{currentData[prop] - prevData[prop]} {prop}</div>
        ))}
      </div>
    );
  }
  else {
    return (
      <div>
        {properties.map((prop, index) => (
          <div key={`${index}.${prop}`}> {prevData[prop] - beforePrevData[prop]} {prop}</div>
        ))}
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
