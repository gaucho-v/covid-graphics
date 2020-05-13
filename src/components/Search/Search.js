import React, {useState} from  'react';
import { Button, Input, Tooltip } from 'antd';
import styled from 'styled-components';
import './Search.css';

const SearchGroup = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  padding: 10px 0;
  width: 720px;
     
`;
const FilteredLocations = styled.div`
    position: absolute;
    width: 100%;
    text-align: left;
    margin-top: 32px;
    z-index: 989;
    cursor: default;
`;
const FilteredLocationStyle = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    list-style-type: none;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0 0 15px 15px;
    box-shadow: 0 4px 6px 0 rgba(32,33,36,0.28);
    padding-bottom: 4px;
    overflow: hidden;
`;
const TextInFindPlaced = styled.div`
    display: flex;
    flex: auto;
    justify-content: space-between;
    min-width: 0;
    max-height: none;
    padding: 6px 0;
    :hover {
      background-color: #eee;
    }
`;
const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;
const Text = styled.span`
  margin: 0 11px;
`;

window.onscroll = function showHeader() {
  const header = document.getElementById('header');
  if (header) {
    if (window.pageYOffset > 30) {
      header.classList.add('header-fixed');
    }
    else {
      header.classList.remove('header-fixed');
    }
  }
};

const Search = ({ search, onChange, onAddPlace,filteredLocations, locationsData}) => {
  const [isFilteredLocations, onChangeIsFilteredLocation] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onAddPlace();
  };
  const handleInputChange = (e) => {
    onChangeIsFilteredLocation(true);
    if(e.target.value === '') {
      onChangeIsFilteredLocation(false);
    }
    onChange(e)
  };
  const confirmedInLocation = (location) => {
    const locationData = locationsData.find((e) => e.en === location) || locationsData.find((e) => e.ru === location);
    return locationData.confirmed
  };
  const inputStyle = !isFilteredLocations ? '15px 0px 0px 15px' : '15px 0 0 0';
  const btnStyle = !isFilteredLocations ? '0px 15px 15px 0px' : '0 15px 0 0';
  return (
    <form onSubmit={handleFormSubmit}>
    <SearchGroup id='header'>
        <Input placeholder='Введите название города' style={{borderRadius: inputStyle}}  value={search} onChange={handleInputChange} onBlur={f=>f}/>
        <Tooltip title="search">
          <Button style={{borderRadius: btnStyle}} type="primary" >Добавить место</Button>
        </Tooltip>
        {!!filteredLocations.length && <FilteredLocations>
          <FilteredLocationStyle>
            <List>
              {filteredLocations.splice(0,5).map((location,index) => <li key={location + index} onClick={() => onAddPlace(location)}>
                <TextInFindPlaced>
                  <Text><b>{location}</b></Text>
                  <Text>{confirmedInLocation(location)} Подтверженных диагнозов</Text>
                </TextInFindPlaced></li>)}
            </List>
          </FilteredLocationStyle>
        </FilteredLocations>}
    </SearchGroup>
    </form>
  )
};

export default Search;


