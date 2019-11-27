import React from 'react';
import styled from 'styled-components';
import searchIcon from './search.svg';

const Container = styled.div`
    padding-left: 50px;
    width: 100%;
    position: relative;
    margin-bottom: 20px;
    img {
        position: absolute;
        top: 50%;
        left: 60px;
        transform: translateY(-50%);
    }
    input {
        width: 100%;
        height: 55px;
        padding-left: 44px;
        border: 2px solid #c0d0e6;
        outline: none;
        font-size: 22px;
        color: #869cba;
    }
`;

const SearchBar: React.FC = () => {
    return (
        <Container>
            <img src={searchIcon} />
            <input type="text" />
        </Container>
    );
};

export default SearchBar;
