import React from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';



const SimpleLineChart = ({placeData} : any)  => {

    const dateFromPlaceData = placeData.map((el: any) => el.date.slice(5,10));
    placeData = placeData.map((el: any,index : number) => Object.assign(el, {date : dateFromPlaceData[index]}));


    return (
    <LineChart width={300} height={300} data={placeData}
              >
      <XAxis dataKey='date'/>
      <YAxis/>
      <CartesianGrid strokeDasharray="0.5 1"/>
      <Tooltip/>

      <Line type="monotone" dataKey="confirmed" stroke="red" r={1}/>
      <Line type="monotone" dataKey="cured" stroke="#82ca9d" r={1}/>
      <Line type="monotone" dataKey="deaths" stroke="black"  r={1} />
    </LineChart>
  )
};

export default SimpleLineChart;