import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../auth';
import { Redirect, useHistory } from 'react-router';

import styled from 'styled-components';
import { StyledVariables, Row, Column } from '../../styled';
import MapComponent from '../../components/Map';
import FarmInfo from '../../components/FarmInfo';
import SearchBar from '../../components/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducers';
import { getFarms } from '../../services/api';
import { FarmsState } from '../../store/reducers/Farms';

const Container = styled.div`
    margin: 0 auto;
    padding: ${StyledVariables.containerPadding};
    padding-top: 70px;
    max-width: ${StyledVariables.lg};
`;

export default function Home() {
    const [logged, setLogged] = useState(true);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const farmsData = useSelector((state: RootState) => state.farms);
    const selectedFarm: FarmsState['farmSelected'] = useSelector(
        (states: RootState) => states.farms.farmSelected
    );
    const dispatch = useDispatch();

    useEffect(() => {
        authUser();
        dispatch(getFarms());
    }, []);

    const authUser = async () => {
        try {
            await isAuthenticated();

            setLogged(true);
            setLoading(false);
        } catch (err) {
            setLogged(false);
            setLoading(false);
        }
    };

    const Content = (
        <>
            <Row>
                <Column />
                <Column>
                    <SearchBar />
                </Column>
            </Row>
            <Row>
                <Column>
                    <MapComponent selectedFarm={selectedFarm} />
                </Column>

                <Column>
                    <FarmInfo
                        farmsData={farmsData}
                        onClick={() => {
                            console.log(selectedFarm);
                            history.push(
                                `/farm-detail/${selectedFarm.farm_id}`
                            );
                        }}
                    />
                </Column>
            </Row>
        </>
    );
    return <Container>{logged ? Content : <Redirect to="/login" />}</Container>;
}
