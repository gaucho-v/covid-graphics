import React from 'react';
import { Button, Input, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import './Search.css';

const SearchGroup = styled.div`
  display: flex;
  padding: 20px;
`;

window.onscroll = function showHeader() {
  const header = document.getElementById('header');
  if (header) {
    if (window.pageYOffset > 52) {
      header.classList.add('header-fixed');
    }
    else {
      header.classList.remove('header-fixed');
    }
  }
};

const Search = ({ search, onChange, onAddPlace  }) => (
  <SearchGroup id='header'>
    <Input value={search} onChange={onChange}/>
    <Tooltip title="search">
      <Button type="primary" icon={<SearchOutlined />} onClick={onAddPlace}>Добавить место</Button>
    </Tooltip>
  </SearchGroup>
);

export default Search;


