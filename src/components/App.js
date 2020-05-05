import React, {Component} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import SimpleLineChart from "./Recharts/Recharts";
import axios from 'axios'
import Loader from "./UI/Loader/Loader";

// Некоторые области надо писать только на русском.
const cities = ['Russia','Moscow','Saint Petersburg','Voronezh region','Белгородская область', 'Калининградская область','Ukraine', 'Belarus', 'USA'];
const API_URL = 'https://cors-anywhere.herokuapp.com/coronavirus-monitor.ru/jquery-lite-9.js?a=12';

class App extends Component {
    state = {
        data: [],
        isLoading: false
    };

    componentDidMount() {
        axios.get(API_URL).then(({data: dataString}) => {
            const jsn = dataString.substring(dataString.indexOf('{'));
            const data = JSON.parse(jsn);
            this.setState({
                data: [...data.cities.data.cities, data.countries.data.countries.find((el) => el.en === 'Russia')],
                dataCountries: data.countries.data.countries
            });
        }).catch(f => f)
    }

    render() {
        const {data} = this.state;
        const {statistics} = data.find((el) => el.en === 'Moscow') || {};
        const lastData = statistics;
        if (!statistics) {
            return (
              <Container>
                  <GlobalStyle/>
                  <Loader/>
              </Container>
            )
        }
        const isUpdate = lastData[lastData.length-1].confirmed - lastData[lastData.length-2].confirmed;

        return (
            <Container>
                <GlobalStyle/>
                {!isUpdate ?  <DataAlertHeading>Данных за {lastData[lastData.length-1].date.slice(5,10)} ещё нет</DataAlertHeading> : null}
                <Graphics>
                    {cities.map((place, index) => {
                        const cityData = data.find(el => el.en === place);
                        if (!cityData) {
                            return null
                        }
                        const {statistics} = cityData;
                        let placeName = place.toUpperCase();
                        if (place === 'Белгородская область') {
                             placeName = 'BELGOROD'
                        }
                        if (place === 'Калининградская область') {
                            placeName = '(NEW) KALININGRAD'
                        }

                        return (
                            <RelativeForGraphics key={`${index}.${place}`}>
                                <PlaceName> {placeName} </PlaceName>
                                <LastStatistic>
                                    <p>Last data:</p>
                                    {isUpdate ? <>
                                            <div>{statistics[statistics.length-1].confirmed - statistics[statistics.length-2].confirmed} confirmed</div>
                                            <div>{statistics[statistics.length-1].cured - statistics[statistics.length-2].cured} cured</div>
                                            <div>{statistics[statistics.length-1].deaths - statistics[statistics.length-2].deaths} d</div>
                                        </> :
                                        <>
                                            <div>{statistics[statistics.length-2].confirmed - statistics[statistics.length-3].confirmed} confirmed</div>
                                            <div>{statistics[statistics.length-2].cured - statistics[statistics.length-3].cured} cured</div>
                                            <div>{statistics[statistics.length-2].deaths - statistics[statistics.length-3].deaths} d</div>
                                        </>}
                                </LastStatistic>
                                <SimpleLineChart
                                    placeData={statistics}/>
                            </RelativeForGraphics>
                        )
                    })
                    }
                </Graphics>
            </Container>
        )
    }
};

export default App


const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Inconsolata&display=swap");
  body {
    background-color: #eee;
    font-family: 'Inconsolata', monospace;
    @media (max-width: 1024px) {
      background: none;
    }
  };
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  border: 2px solid #eee;
  border-radius: 7px;
  padding-right: 15px;
  background-color: white;
  
  
  @media (max-width: 1024px) {
        width: 100%;
        border: none;
    }
`;
const Graphics = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const DataAlertHeading = styled.h2`
  text-align: center;
  color: darkred;
  text-transform: uppercase;
`;

const RelativeForGraphics = styled.div`
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
    top: 24%;
    left: 16%;
    flex-direction: column;
    padding: 5px;
    border: 2px solid #eee;
    border-radius: 7px;
    color: #b5bbbb;
    
`;



