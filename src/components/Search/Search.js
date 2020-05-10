import React from 'react'
import {Button, Input, Tooltip} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import styled from "styled-components";
import './Search.css'
import CitiesList from "../CitiesList/CitiesList";


window.onscroll = function showHeader() {
  const header = document.getElementById('header')
  if (window.pageYOffset > 52) {
    header.classList.add('header-fixed')
  }
  else {
    header.classList.remove('header-fixed')
  }
};

const Search = ({search,changeInput,addPlace,showCitiesList,listCitiesForRussia,onCloseCitiesList}) => {
  return (
    <SearchGroup id='header'>
      <Button type="primary" onClick={showCitiesList}>Список городов России</Button>
      <Input value={search} onChange={changeInput}></Input>
      <Tooltip title="search">
        <Button type="primary" icon={<SearchOutlined />} onClick={addPlace}>Поиск</Button>
      </Tooltip>
      <CitiesList listCitiesForRussia={listCitiesForRussia} onCloseCitiesList={onCloseCitiesList}/>
    </SearchGroup>
  )
};

export default Search

const SearchGroup = styled.div`
  display: flex;
  padding: 20px;
`;
