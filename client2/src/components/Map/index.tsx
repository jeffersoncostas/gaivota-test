import React, { useEffect } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/index.js';
import { FarmsState } from '../../store/reducers/Farms.js';

const Container = styled.div<ContainerStyled>`
    .leaflet-container {
        height: 540px;
        width: 100%;
        ${props => (props.mapHeight ? `height: ${props.mapHeight}px` : '')};
    }
`;
interface ContainerStyled {
    mapHeight?: number;
}

interface Props {
    style?: React.CSSProperties;
    mapHeight?: number;
    selectedFarm: FarmsState['farmSelected'];
}
const MapComponent: React.FC<Props> = ({ style, mapHeight, selectedFarm }) => {
    useEffect(() => {
        console.log(selectedFarm);
    }, [selectedFarm]);

    const geoJSONStyle = () => {
        return {
            color: '#1f2021',
            weight: 1,
            fillOpacity: 0.5,
            fillColor: '#fff2af'
        };
    };

    return (
        <Container style={style} mapHeight={mapHeight}>
            <Map
                center={[selectedFarm.latitude, selectedFarm.longitude]}
                zoom={15}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />

                <GeoJSON
                    key={selectedFarm.farm_id}
                    data={selectedFarm.geoJson}
                    style={geoJSONStyle}
                />
            </Map>
        </Container>
    );
};

export default MapComponent;
