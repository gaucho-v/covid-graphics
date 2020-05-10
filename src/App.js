import React, { Component, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Loader from './components/UI/Loader/Loader';
import ChartsList from './components/ChartsList';
import { INITIAL_LOCATIONS } from './contants';
import Search from './components/Search/Search';
import { message } from 'antd';
import DataApi from './api';

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


class App extends Component {
    state = {
      search: '',
      locationsData: {},
      selectedLocations: localStorage.selectedLocations ? localStorage.selectedLocations.split(',') : [...INITIAL_LOCATIONS],
      isLoading: false,
    };

    componentDidMount() {
      this.setState({ isLoading: true });
      DataApi.getStats().then(res => {
        this.setState({ locationsData: res, isLoading: false });
      });
      // add resize for mobile version
      // window.addEventListener('optimizedResize', () => {
      //   console.log('Resource conscious resize callback!');
      // });
      window.onbeforeunload = this.saveLocations;
    }
    
    saveLocations = () => {
      const { selectedLocations } = this.state;
      localStorage.setItem('selectedLocations', selectedLocations);
    }

  handleSearchChange = ({ target: { value } }) => {
    this.setState({
      search: value,
    });
  };

    handleAddPlace = () => {
      const { locationsData, search, selectedLocations } = this.state;
      const searchedPlace = search.toLowerCase().trim();
      if (selectedLocations.map(el => el.toLowerCase()).includes(searchedPlace)) {
        message.info('График по выбранному месту уже есть в списке');
        return;
      }
      const allKnownLocations = locationsData.reduce((acc, location) => {
        acc.push(location.en.toLowerCase());
        acc.push(location.ru.toLowerCase());
        return acc;
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

  handleRemoveLocation = locationName => {
    this.setState(({ selectedLocations }) => ({
      selectedLocations: selectedLocations.filter(el => el !== locationName),
    }));
  }

  render() {
    const {  search, locationsData, selectedLocations, isLoading } = this.state;
    return (
      <Container>
        <GlobalStyle/>
        {isLoading ? <Loader/> : (
          <Fragment>
            <Search
              search={search}
              onAddPlace={this.handleAddPlace}
              onChange={this.handleSearchChange}
            />
            {!!locationsData.length && (
              <ChartsList
                data={locationsData}
                selected={selectedLocations}
                onRemoveChart={this.handleRemoveLocation}
              />
            )}
          </Fragment>
        )}
      </Container>
    );
  }
}

export default App;


