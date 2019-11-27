import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { Row } from '../../styled';
import {
    FarmsState,
    initialState,
    FarmsActionTypes
} from '../../store/reducers/Farms';
import FarmSelector from './FarmSelector';
import { useDispatch } from 'react-redux';

export const FarmInfoContainer = styled.div`
    padding: 0px 50px;
    > div {
        border-left: 4px solid #e9f3ff;
        padding-left: 30px;
    }
    h1 {
        font-size: 28px;
        font-weight: 500;
        margin-bottom: 25px;
    }
    span {
        display: block;
        font-size: 22px;
        margin-bottom: 20px;
        font-weight: normal;

        &.price {
            margin-top: 40px;
            font-weight: 500;
            font-size: 22px;
            text-transform: uppercase;
        }
    }
`;

interface Props {
    farmsData?: FarmsState;
    onClick?:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onClick2?:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
}
const FarmInfo: React.FC<Props> = props => {
    const { onClick, onClick2, farmsData = initialState } = props;
    const [selectedFarm, setSelectedFarm] = useState<any>('');

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(selectedFarm);
        if (selectedFarm) {
            dispatch({
                type: FarmsActionTypes.SELECTED,
                payload: selectedFarm
            });
        }
    }, [selectedFarm]);

    const FarmInfoCompleted = (
        <Row>
            <Button
                text="buy now"
                onClick={onClick}
                style={{ marginRight: 30 }}
                stroked
            />
            <Button text="bid" onClick={onClick2} />
        </Row>
    );
    if (farmsData.loading)
        return <FarmInfoContainer> Carregando... </FarmInfoContainer>;

    return (
        <FarmInfoContainer>
            <div>
                <FarmSelector
                    data={farmsData.data}
                    onChange={e => {
                        console.log('changed', e.target.value);
                        setSelectedFarm(
                            farmsData.data.filter(
                                (farm: any) => farm.farm_id == e.target.value
                            )[0]
                        );
                    }}
                    selected={selectedFarm}
                />

                <span>Culture: {selectedFarm.culture} </span>
                <span>Variety: {selectedFarm.variety} </span>
                <span>Area: {selectedFarm.total_area}ha </span>
                <span>
                    Yield estimation: {selectedFarm.yield_estimation} ton/ha{' '}
                </span>
                <span>
                    Total:{' '}
                    {selectedFarm.total_area * selectedFarm.yield_estimation}{' '}
                </span>
                <span className="price">price: {selectedFarm.price} </span>

                <Row>
                    <Button
                        text="see details"
                        style={{ width: '100%' }}
                        onClick={onClick}
                    />
                </Row>
            </div>
        </FarmInfoContainer>
    );
};

export default FarmInfo;
