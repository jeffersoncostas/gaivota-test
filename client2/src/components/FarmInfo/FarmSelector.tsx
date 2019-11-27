import React from 'react';
import styled from 'styled-components';

const Container = styled.select`
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 25px;
    border: none;
    outline: none;
`;

interface Props {
    data: any[];
    isLoading?: boolean;
    selected?: any;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FarmSelector: React.FC<Props> = props => {
    const { data = [], onChange, selected } = props;

    if (!data[0]) return <>Carregando...</>;

    return (
        <>
            <Container onChange={onChange} defaultValue="">
                <option disabled value="">
                    Select a Farm
                </option>
                {data.map(farm => (
                    <option key={farm.farm_id} value={farm.farm_id}>
                        {farm.name}
                    </option>
                ))}
            </Container>
        </>
    );
};

export default FarmSelector;
