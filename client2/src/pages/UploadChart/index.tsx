import React, { useCallback, useEffect, useState } from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';
import { StyledVariables, Row } from '../../styled';
import { useDropzone } from 'react-dropzone';
import parseCsvFile from './parseCsvFile';
import { ResponsiveLine } from '@nivo/line';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

const Container = styled.div`
    margin: 0 auto;
    padding: ${StyledVariables.containerPadding};
    padding-top: 70px;
    max-width: ${StyledVariables.lg};

    .dropzone {
        height: 80px;
        padding: 20px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: dotted 2px black;
    }
`;

const UploadChart: React.FC = () => {
    const chartData = useSelector((state: RootState) => state.uploadCsv);

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        parseCsvFile(acceptedFiles);
    }, []);

    useEffect(() => {
        console.log(chartData);
    }, [chartData]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        acceptedFiles,
        isDragAccept,
        draggedFiles
    } = useDropzone({ multiple: false, accept: '.csv', onDrop });

    const files = acceptedFiles.map((file: any) => {
        return (
            <li key={file.path}>
                {file.path} - {file.size} bytes
            </li>
        );
    });

    return (
        <>
            <Header isUploadPage />
            <Container>
                <Row>
                    <div
                        className="drop-zone"
                        {...getRootProps({ className: 'dropzone' })}
                    >
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop the .csv file here</p>
                    </div>
                </Row>
                <Row>
                    <aside>
                        <h4>Files</h4>
                        <ul>{files}</ul>
                    </aside>
                </Row>
                <Row style={{ height: 400 }}>
                    {chartData.data ? (
                        <ResponsiveLine
                            data={chartData.data.newData}
                            enablePoints={false}
                            margin={{
                                top: 50,
                                right: 110,
                                bottom: 50,
                                left: 60
                            }}
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
                                legend: chartData.data.legendX,
                                legendOffset: 36,
                                legendPosition: 'middle'
                            }}
                            axisLeft={{
                                orient: 'left',
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: chartData.data.legendY,
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
                                                itemBackground:
                                                    'rgba(0, 0, 0, .03)',
                                                itemOpacity: 1
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
                    ) : null}
                </Row>
            </Container>
        </>
    );
};

export default UploadChart;
