import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/imgs/logo192.png';
import { StyledVariables } from '../../styled';
import { Link } from 'react-router-dom';

const Container = styled.header`
    width: 100%;
    background: white;
    box-shadow: 0px 3px 50px rgba(0, 0, 0, 0.16);
    height: 70px;

    .header-container {
        padding: ${StyledVariables.containerPadding};
        max-width: ${StyledVariables.lg};
        display: flex;
        margin: 0 auto;
        > a {
            img {
                width: 40px;
                height: 40px;
                margin-right: 30px;
            }
        }
        .header-bttns {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            align-items: center;
            a {
                cursor: pointer;
                text-decoration: none;
                color: black;
                margin-right: 20px;
                &:last-child {
                    margin: 0;
                }
            }
        }
    }
`;

const Header: React.FC<{ isUploadPage?: boolean }> = props => {
    return (
        <Container>
            <div className="header-container">
                <Link to="/">
                    <img src={logo} />
                </Link>
                <div className="header-bttns">
                    {props.isUploadPage ? null : (
                        <Link to="/upload-chart"> UPLOAD</Link>
                    )}
                    <a> LOGOUT</a>
                </div>
            </div>
        </Container>
    );
};

export default Header;
