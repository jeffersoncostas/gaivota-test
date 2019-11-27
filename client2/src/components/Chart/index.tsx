import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';

import styled from 'styled-components';

import data from './placeholderdata.json';
import selectorData from '../../config/chart_selector.json';
import CustomSelect from '../CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/index';
import { getFarmChartDatax } from '../../services/api';

const Container = styled.div`
    width: 100%;
    height: 400px;
`;

interface Props {
    selectData?: any;
    selectedFarmId: any;
}

const Chart: React.FC<Props> = ({ selectData, selectedFarmId }) => {
    const [selected, setSelected] = useState<any>('');
    const farmChartData = useSelector(
        (states: RootState) => states.farmChartData
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (selected) {
            console.log(selected);
            dispatch(getFarmChartDatax(selected.name, selectedFarmId));
        }
    }, [selected]);

    useEffect(() => {
        console.log(farmChartData);
        console.log(selected.min_value);
    }, [farmChartData]);

    return (
        <Container style={{ marginTop: 40 }}>
            <CustomSelect
                data={selectData}
                selected={selected}
                onChange={e =>
                    setSelected(
                        selectorData.options.filter(
                            x => x.name == e.target.value
                        )[0]
                    )
                }
            />

            {selected &&
            !farmChartData.loading &&
            selected.chart_type == 'bar' ? (
                <ResponsiveBar
                    data={farmChartData.data}
                    keys={[`${selected.name}_${selectedFarmId}`]}
                    minValue={selected.min_value}
                    maxValue={selected.max_value}
                    indexBy="date"
                    groupMode="grouped"
                    margin={{ top: 50, right: 0, bottom: 50, left: 60 }}
                    innerPadding={4}
                    colors={{ scheme: 'nivo' }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: '#38bcb2',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: '#eed312',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: `${selected.name}_${selectedFarmId}`
                            },
                            id: 'lines'
                        }
                    ]}
                    borderColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]]
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'date',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: selected.name,
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]]
                    }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            ) : null}

            {selected &&
            !farmChartData.loading &&
            selected.chart_type == 'line' ? (
                <ResponsiveLine
                    data={farmChartData.data}
                    enablePoints={false}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        stacked: true,
                        min: 'auto',
                        max: 'auto'
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'transportation',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'count',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    colors={{ scheme: 'nivo' }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            ) : null}
        </Container>
    );
};

export default Chart;
