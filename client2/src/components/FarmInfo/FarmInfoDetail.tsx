import React, { useEffect } from 'react';
import { FarmsState, initialState } from '../../store/reducers/Farms';
import { FarmInfoContainer } from '.';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { Row } from '../../styled';
import Button from '../Button';
import { useParams } from 'react-router';

interface Props {
    onClick?:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onClick2?:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
}

const FarmInfoDetail: React.FC<Props> = props => {
    const { onClick, onClick2 } = props;

    const selectedFarm: FarmsState['farmSelected'] = useSelector(
        (states: RootState) => states.farms.farmSelected
    );

    return (
        <FarmInfoContainer>
            <div>
                <h1> {selectedFarm.name} </h1>
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
                        text="buy now"
                        onClick={onClick}
                        style={{ marginRight: 30 }}
                        stroked
                    />
                    <Button text="bid" onClick={onClick2} />
                </Row>
            </div>
        </FarmInfoContainer>
    );
};

export default FarmInfoDetail;
