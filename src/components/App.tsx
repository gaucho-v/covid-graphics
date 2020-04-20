import React from 'react';
import styled from 'styled-components';
import SimpleLineChart from "./Recharts/Recharts";



declare global { interface Window { dataFromServer: any; } }

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PlaceName = styled.h3`
  text-align: center
`;


const App =  () => {

  const cities = ['Белгородская область', 'Moscow', 'Ukraine', 'Belarus', 'USA', 'Spain'];


  return (
      <Container>
      {cities.map((place, index) =>
          <div  key={index+place}>
            <PlaceName> {place} </PlaceName>
            <SimpleLineChart
                placeData={window.dataFromServer.cities.data.cities.filter((el: any) => el.en === place)[0].statistics}/>
          </div>)
      }
      </Container>

  )
};

export default App