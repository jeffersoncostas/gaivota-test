import React from 'react';
import styled from 'styled-components';

interface Props {
    text: string;
    stroked?: boolean;
    style?: React.CSSProperties;
    onClick?:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
}
interface StyledBttn {
    stroked?: boolean;
}

const Container = styled.button<StyledBttn>`
    padding: 20px 30px;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 22px;
    color: white;
    letter-spacing: 5px;
    border: none;
    background: linear-gradient(45deg, #3986de, #73a5df);
    min-width: 195px;
    cursor: pointer;
    ${props =>
        props.stroked
            ? ` color: #3986de; border: 3px solid #3986de; background:white  `
            : ''};
    transition: all 150ms;
    &:hover {
        box-shadow: 0px 8px 9px rgba(112, 198, 255, 0.46);
    }
`;

const Button: React.FC<Props> = props => {
    const { text, ...newProps } = props;
    return <Container {...newProps}> {text} </Container>;
};

export default Button;
