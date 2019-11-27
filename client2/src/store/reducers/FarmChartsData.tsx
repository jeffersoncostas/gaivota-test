import { Reducer } from 'redux';

export enum FarmChartDataActionTypes {
    FETCH_REQUEST = '@@farmChartData/FETCH_REQUEST',
    FETCH_SUCCESS = '@@farmChartData/FETCH_SUCCESS',
    FETCH_ERROR = '@@farmChartData/FETCH_ERROR',
    SELECTED = '@@farmChartData/SELECTED'
}

export type FarmChartDataActions =
    | { type: FarmChartDataActionTypes.FETCH_SUCCESS; payload: any }
    | { type: FarmChartDataActionTypes.FETCH_REQUEST }
    | { type: FarmChartDataActionTypes.FETCH_ERROR; message: any }
    | { type: FarmChartDataActionTypes.SELECTED };

export interface FarmChartDataState {
    data: any;
    loading: boolean;
    error?: string;
}
const initialState: FarmChartDataState = {
    data: [],
    loading: true,
    error: undefined
};

const FarmChartDataReducer: Reducer<FarmChartDataState, any> = (
    state = initialState,
    action: FarmChartDataActions
) => {
    switch (action.type) {
        case FarmChartDataActionTypes.FETCH_REQUEST:
            return { ...state, loading: true };
        case FarmChartDataActionTypes.FETCH_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FarmChartDataActionTypes.FETCH_ERROR:
            return { ...state, loading: false, error: action.message };

        default:
            return state;
    }
};

export default FarmChartDataReducer;
