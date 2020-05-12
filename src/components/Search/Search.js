import React from 'react';
import { Button, Input, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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
    border-radius: 0 0 24px 24px;
    box-shadow: 0 4px 6px 0 rgba(32,33,36,0.28);
    padding-bottom: 4px;
    overflow: hidden;
`;

const TextInFindPlaced = styled.div`
    display: flex;
    flex: auto;
    flex-direction: column;
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
  margin-left: 11px;
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



const Search = ({ search, onChange, onAddPlace,filteredLocations}) => {
  return (
    <SearchGroup id='header'>
      <Input value={search} onChange={onChange}/>
      <Tooltip title="search">
        <Button type="primary" icon={<SearchOutlined />} onClick={onAddPlace}>Добавить место</Button>
      </Tooltip>
      {!!filteredLocations.length && <FilteredLocations>
        <FilteredLocationStyle>
          <List>
            {filteredLocations.splice(0,5).map((el,index) => <li key={el + index} onClick={() => onAddPlace(el)}>
              <TextInFindPlaced><Text>{el}</Text></TextInFindPlaced></li>)}
          </List>
        </FilteredLocationStyle>
      </FilteredLocations>}
    </SearchGroup>
  )
};

export default Search;


