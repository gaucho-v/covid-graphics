import React, {Component} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import axios from 'axios'
import Loader from "./UI/Loader/Loader";
import Main from './Main/Main'
import {API_URL} from '../contants'
import Search from "./Search/Search";
import {message} from "antd";


class App extends Component {
    state = {
        data: [],
        cities: ['Россия','Москва','Санкт-Петербург','Воронежский регион','Белгородская область', 'Калининградская область','Украина', 'Беларусь', 'США'],
        search: '',
        listCitiesForRussia: null
    };

    componentDidMount() {
        window.addEventListener("optimizedResize", function() {
            console.log("Resource conscious resize callback!");
        });
        axios.get(API_URL).then(({data: dataString}) => {
            const jsn = dataString.substring(dataString.indexOf('{'));
            const data = JSON.parse(jsn);

            this.setState({
                data: [...data.cities.data.cities, data.countries.data.countries.find((el) => el.ru === 'Россия')],
            });
        }).catch(f => f)
    }

    handleChangeInput = ({target: {value}}) => {
         this.setState({
             search: value
        })
    };

    handleAddPlace = () => {
        const listNamesPlaces = this.state.data.map((el) => el.ru.toUpperCase());
        const index = listNamesPlaces.indexOf(this.state.search.toUpperCase());
        if(index >= 0) {
            message.info('Такое место есть');

            this.setState({
                cities: [...this.state.cities,this.state.search],
                search: ''
            });
        }
        else {
            message.error('Неправильно введен город');
        }
    };

    handleShowCitiesList = () => {
        const {data} = this.state
        const cities = data.filter((el) => el.country === 'Россия').map((el) => el.ru);
        this.setState({
            listCitiesForRussia: cities
        })
    };
    handleCloseCitiesList = () => {
        this.setState({
            listCitiesForRussia: null
        })
    };

    render() {
        const {data,search,cities,listCitiesForRussia} = this.state;
        const {statistics} = data[0] || {};
        if (!statistics) {
            return (
              <Container>
                  <GlobalStyle/>
                  <Loader/>
              </Container>
            )
        }
        const isUpdate = statistics[statistics.length-1].confirmed - statistics[statistics.length-2].confirmed;
        const currentDate = statistics[statistics.length-1].date.slice(5,10);
        return (
            <Container>
                <GlobalStyle/>
                <Search search={search} addPlace={this.handleAddPlace}
                        changeInput={this.handleChangeInput}
                        showCitiesList={this.handleShowCitiesList}
                        listCitiesForRussia={listCitiesForRussia}
                        onCloseCitiesList={this.handleCloseCitiesList}
                />
                {!isUpdate ?  <CurrentDate>Данных за {currentDate} ещё нет</CurrentDate> : null}
                <Main data={data} cities={cities} isUpdate={isUpdate}/>
            </Container>
        )
    }
}

export default App


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


