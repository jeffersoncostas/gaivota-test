import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing:border-box;
        margin:0;
        padding: 0;
    }
    body,html,#root{
        height: 100%;
        width: 100%;

    }
`;

const Background = styled.div`
    background: black;

`

export { GlobalStyle }