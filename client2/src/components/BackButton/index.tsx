import React from 'react';
import styled from 'styled-components';
import backIcon from './icon-arrow-down.svg';

const Container = styled.a`
    text-transform: uppercase;
    font-size: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
        margin-right: 10px;
        width: 15px;
        height: 15px;
    }
`;

interface Props {
    onClick:
        | ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void)
        | undefined;
}

const BackButton: React.FC<Props> = ({ onClick }) => {
    return (
        <Container onClick={onClick}>
            <img src={backIcon} />
            Back
        </Container>
    );
};

export default BackButton;
