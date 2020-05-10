import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import Loader from './components/UI/Loader/Loader';
import ChartsList from './components/ChartsList';
import { API_URL, INITIAL_LOCATIONS } from './contants';
import Search from './components/Search/Search';
import { message } from 'antd';
import DataApi from './api';

class App extends Component {
    state = {
      search: '',
      locationsData: {},
      selectedLocations: [...INITIAL_LOCATIONS],
      
      data: [],
      cities: [...INITIAL_LOCATIONS],
      listCitiesForRussia: null,
    };

    componentDidMount() {
      DataApi.getStats().then(res => {
        this.setState({ locationsData: res });
      });
      // add resize for mobile version
      window.addEventListener('optimizedResize', () => {
        console.log('Resource conscious resize callback!');
      });
    }

    handleChangeInput = ({ target: { value } }) => {
      this.setState({
        search: value,
      });
    };

    handleAddPlace = () => {
      const { locationsData, search, selectedLocations } = this.state;
      const searchedPlace = search.toLowerCase().trim();
      if (selectedLocations.includes(searchedPlace)) {
        message.info('График по выбранному месту уже есть в списке');
        return;
      }
      const allKnownLocations = Object.values(locationsData).reduce((acc, curr) => {
        const allLocations = curr.reduce((acc, location) => {
          acc.push[location.en.toLowerCase()];
          acc.push[location.ru.toLowerCase()];
          return acc;
        }, []);
        return acc.concat(allLocations);
      }, []);
     
      const locationFound = allKnownLocations.find(el => el === searchedPlace);
      if (locationFound) {
        message.info('Место найдено, график добавлен');
        this.setState({
          selectedLocations: [searchedPlace, ...selectedLocations],
        });
      }
      else {
        message.error('По выбранному месту отсутствует статистика');
      }
    };

    handleShowCitiesList = () => {
      const { data } = this.state;
      const cities = data.filter(el => el.country === 'Россия').map(el => el.ru);
      this.setState({
        listCitiesForRussia: cities,
      });
    };
    handleCloseCitiesList = () => {
      this.setState({
        listCitiesForRussia: null,
      });
    };

    render() {
      const { data, search, listCitiesForRussia, locationsData, selectedLocations } = this.state;
      const { statistics } = data[0] || {};
      if (!statistics) {
        return (
          <Container>
            <GlobalStyle/>
            <Loader/>
          </Container>
        );
      }
      // const isUpdate = statistics[statistics.length - 1].confirmed - statistics[statistics.length - 2].confirmed;
      // const currentDate = statistics[statistics.length - 1].date.slice(5, 10);
      return (
        <Container>
          <GlobalStyle/>
          <Search search={search} addPlace={this.handleAddPlace}
            changeInput={this.handleChangeInput}
            showCitiesList={this.handleShowCitiesList}
            listCitiesForRussia={listCitiesForRussia}
            onCloseCitiesList={this.handleCloseCitiesList}
          />
          {/*{!isUpdate ?  <CurrentDate>Данных за {currentDate} ещё нет</CurrentDate> : null}*/}
          <ChartsList data={locationsData} selected={selectedLocations}/>
        </Container>
      );
    }
}

export default App;


const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Inconsolata&display=swap");
  body {
    background-color: #eee;
    font-family: 'Inconsolata', monospace;
    height: auto;
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
  background-color: white;
  @media (max-width: 1024px) {
        width: 100%;
        border: none;
        padding: 0;
    }
`;
const CurrentDate = styled.h2`
  text-align: center;
  color: darkred;
  text-transform: uppercase;
`;


