import React, { useEffect } from 'react';
import styled from 'styled-components';
import { StyledVariables, Row, Column } from '../../styled';
import MapComponent from '../../components/Map';
import FarmInfo from '../../components/FarmInfo';
import BackButton from '../../components/BackButton';
import { useHistory, useParams } from 'react-router';
import Chart from '../../components/Chart';
import { useDispatch, useSelector } from 'react-redux';
import { getFarmChartSelector, getFarm } from '../../services/api';
import { RootState } from '../../store/reducers';
import FarmInfoDetail from '../../components/FarmInfo/FarmInfoDetail';
import { FarmsState } from '../../store/reducers/Farms';

const Container = styled.div`
    margin: 0 auto;
    padding: ${StyledVariables.containerPadding};
    padding-top: 70px;
    max-width: ${StyledVariables.lg};
`;
const FarmDetail: React.FC = () => {
    const { farmId } = useParams();

    const history = useHistory();
    const dispatch = useDispatch();
    const selectorData = useSelector(
        (states: RootState) => states.farmChatSelector
    );
    const selectedFarm: FarmsState['farmSelected'] = useSelector(
        (states: RootState) => states.farms.farmSelected
    );

    useEffect(() => {
        dispatch(getFarmChartSelector());
        dispatch(getFarm(farmId));
    }, []);

    useEffect(() => {
        console.log(selectorData);
    }, [selectorData]);

    return (
        <Container>
            <Row style={{ marginBottom: 30 }}>
                <Column>
                    <BackButton
                        onClick={() => {
                            history.push('/home');
                        }}
                    />
                </Column>
            </Row>
            <Row>
                <Column>
                    <MapComponent selectedFarm={selectedFarm} mapHeight={440} />
                </Column>

                <Column>
                    <FarmInfoDetail
                        onClick={() => {
                            console.log('clique 1');
                        }}
                        onClick2={() => {
                            console.log('clique 2');
                        }}
                    />
                </Column>
            </Row>
            <Row>
                <Column>
                    <Chart
                        selectData={selectorData.data}
                        selectedFarmId={farmId}
                    />
                </Column>
            </Row>
        </Container>
    );
};

export default FarmDetail;
