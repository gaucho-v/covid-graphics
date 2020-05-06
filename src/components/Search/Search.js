import React from 'react'
import {Button, Input} from "antd";
import styled from "styled-components";
import './Search.css'


window.onscroll = function showHeader() {
  const header = document.getElementById('header')
  if (window.pageYOffset > 52) {
    header.classList.add('header-fixed')
  }
  else {
    header.classList.remove('header-fixed')
  }
};

const Search = ({search,changeInput,addPlace}) => {
  return (
    <SearchGroup id='header'>
      <Input value={search} onChange={changeInput}></Input>
      <Button type="primary" onClick={addPlace}>Add place</Button>
    </SearchGroup>
  )
};

export default Search

const SearchGroup = styled.div`
  display: flex;
  padding: 20px;
`;
