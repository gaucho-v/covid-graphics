import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const translations = {
  confirmed: 'Подтвержденных диагнозов',
  cured: 'Выздоровели',
  deaths: 'Скончались',
};


const tooltipFormatter = (value, name, props) => [value, translations[name] || name];

const VirusChart = ({ location } )  => {
  const { statistics: placeData } = location;
  const placeDaysWeeks = placeData.map(el => ({
    ...el,
    date: el.date.slice(5, 10),
  }));
  return (
    <LineChart width={450} height={240} data={placeDaysWeeks}>
      <XAxis dataKey='date'/>
      <YAxis width={75}/>
      <CartesianGrid strokeDasharray="0.5 1"/>
      <Tooltip formatter={tooltipFormatter}/>
      <Line type="monotone" dataKey="confirmed" stroke="red" r={1}/>
      <Line type="monotone" dataKey="cured" stroke="#82ca9d" r={1}/>
      <Line type="monotone" dataKey="deaths" stroke="black"  r={1} />
    </LineChart>
  );
};

export default VirusChart;