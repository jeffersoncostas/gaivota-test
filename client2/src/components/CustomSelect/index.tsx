import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.select`
    width: 100%;
    height: 35px;
    padding: 5px;
`;

interface SelectData {
    id: string;
    label?: string;
    placeholder?: string;
    options: {
        id: number;
        name: string;
        chart_type: string;
        min_value: number;
        max_value: number;
    }[];
}
interface Props {
    data: SelectData;
    selected?: any;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect: React.FC<Props> = props => {
    const { data, onChange } = props;

    return (
        <>
            {data.id ? (
                <Container id={data.id} defaultValue="" onChange={onChange}>
                    {data.placeholder ? (
                        <option value="" disabled>
                            {data.placeholder}
                        </option>
                    ) : null}

                    {data.options.map(op => (
                        <option key={op.id} value={op.name}>
                            {op.name}
                        </option>
                    ))}
                </Container>
            ) : null}
        </>
    );
};

export default CustomSelect;
