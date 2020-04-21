import React from 'react';
import styled from 'styled-components';
import SimpleLineChart from "./Recharts/Recharts";


declare global { interface Window { dataFromServer: any; } }

// Города России все равно надо писать на русском языке.
const cities = [ 'Moscow','Saint Petersburg','Voronezh region','Белгородская область', 'Ukraine', 'Belarus', 'USA', 'Spain',];

const App =  () => {



    return (
        <Container>
            {cities.map((place, index) => {
                const data = window.dataFromServer.cities.data.cities.filter((el: any) => el.en === place)[0].statistics;

                return (
                    <GrafFrame key={index + place}>
                        <PlaceName> {place.toUpperCase()} </PlaceName>
                        <LastStatistic>
                            <p>Last data:</p>
                            <div>{data[data.length-1].confirmed - data[data.length-2].confirmed} confirmed</div>
                            <div>{data[data.length-1].cured - data[data.length-2].cured} cured</div>
                            <div>{data[data.length-1].deaths - data[data.length-2].deaths} d</div>
                        </LastStatistic>
                        <SimpleLineChart
                            placeData={data}/>

                    </GrafFrame>
                )
            })
            }
        </Container>
    )
};
export default App




const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
  border: 2px solid #eee;
  border-radius: 7px;
  padding: 0 15px;
  background-color: white;
`;



const GrafFrame = styled.div`
  position: relative;
`;

const PlaceName = styled.h4`
  text-align: center;
  color: #808088;
`;



const LastStatistic = styled.div`
    position: absolute;
    display: flex;
    background: cornsilk;
    top: 20%;
    left: 25%;
    flex-direction: column;
    padding: 5px;
    border: 2px solid #eee;
    border-radius: 7px;
    color: #b5bbbb;
    
`;
