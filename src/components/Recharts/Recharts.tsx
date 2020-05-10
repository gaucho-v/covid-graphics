import React from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';



const SimpleLineChart = ({placeData} : any)  => {
    const placeDaysWeeks = placeData.map((el: any) => ({
        ...el,
        date: el.date.slice(5,10)
    }));
    return (
    <LineChart width={450} height={240} data={placeDaysWeeks}>
      <XAxis dataKey='date'/>
      <YAxis width={75}/>
      <CartesianGrid strokeDasharray="0.5 1"/>
      <Tooltip/>
      <Line type="monotone" dataKey="confirmed" stroke="red" r={1}/>
      <Line type="monotone" dataKey="cured" stroke="#82ca9d" r={1}/>
      <Line type="monotone" dataKey="deaths" stroke="black"  r={1} />
    </LineChart>
  )
};

export default SimpleLineChart;