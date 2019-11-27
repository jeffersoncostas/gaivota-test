import styled, {
    createGlobalStyle,
    css,
    CSSObject,
    FlattenSimpleInterpolation,
    BaseThemedCssFunction
} from 'styled-components';

const StyledVariables = {
    containerPadding: '15px 40px',
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px'
};

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin:0;
        padding: 0;
        font-family: Roboto,Arial, Helvetica, sans-serif;
    }
    body,html,#root{
        height: 100%;
        width: 100%;

    }
`;
const Mq: any = (cssRule: TemplateStringsArray, maxWidth: number) => {
    return css`
        @media (max-width: ${maxWidth}px) {
            ${css(cssRule)}
        }
    `;
};

const Row = styled.div`
    display: flex;
    width: 100%;
    ${Mq`flex-direction:column; ${800}  `}
`;

const Column = styled.div`
    flex: 1;
`;

const Background = styled.div`
    background: white;
`;

export { GlobalStyle, StyledVariables, Row, Column, Mq };
