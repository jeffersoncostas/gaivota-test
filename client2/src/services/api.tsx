import { Dispatch } from 'redux';
import axios from 'axios';
import { FarmChartSelectorActionTypes } from '../store/reducers/FarmChartSelector';
import serverURI from '../serverURI';
import { FarmsActionTypes } from '../store/reducers/Farms';
import { FarmChartDataActionTypes } from '../store/reducers/FarmChartsData';

export function getFarms() {
    return (dispatch: Dispatch) => {
        dispatch({ type: FarmsActionTypes.FETCH_REQUEST });

        axios
            .get(`${serverURI}farms`)
            .then(res => {
                dispatch({
                    type: FarmsActionTypes.FETCH_SUCCESS,
                    payload: res.data
                });
            })
            .catch(e =>
                dispatch({
                    type: FarmsActionTypes.FETCH_ERROR,
                    message: 'error'
                })
            );
    };
}

export function getFarmChartSelector() {
    return (dispatch: Dispatch) => {
        dispatch({
            type: FarmChartSelectorActionTypes.FETCH_REQUEST
        });
        axios
            .get(`${serverURI}chart-selector`)
            .then(res => {
                dispatch({
                    type: FarmChartSelectorActionTypes.FETCH_SUCCESS,
                    payload: res.data
                });
            })
            .catch(e => {
                dispatch({
                    type: FarmChartSelectorActionTypes.FETCH_ERROR,
                    message: 'error'
                });
            });
    };
}

export function getFarm(farmId: any) {
    return (dispatch: Dispatch) => {
        dispatch({ type: FarmsActionTypes.FETCH_REQUEST });

        axios
            .get(`${serverURI}farms/${farmId}`)
            .then(res => {
                dispatch({
                    type: FarmsActionTypes.SELECTED,
                    payload: res.data[0]
                });
            })
            .catch(e =>
                dispatch({
                    type: FarmsActionTypes.FETCH_ERROR,
                    message: 'error'
                })
            );
    };
}

export function getFarmChartDatax(chartType: string, farmId: string) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: FarmChartDataActionTypes.FETCH_REQUEST
        });
        axios
            .get(`${serverURI}${chartType}/${farmId}`)
            .then(res => {
                dispatch({
                    type: FarmChartDataActionTypes.FETCH_SUCCESS,
                    payload: res.data
                });
            })
            .catch(e => {
                dispatch({
                    type: FarmChartDataActionTypes.FETCH_ERROR,
                    message: 'error'
                });
            });
    };
}
