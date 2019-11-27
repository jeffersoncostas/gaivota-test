import { Reducer } from 'redux';

export enum FarmChartSelectorActionTypes {
    FETCH_REQUEST = '@@farmChartSelector/FETCH_REQUEST',
    FETCH_SUCCESS = '@@farmChartSelector/FETCH_SUCCESS',
    FETCH_ERROR = '@@farmChartSelector/FETCH_ERROR',
    SELECTED = '@@farmChartSelector/SELECTED'
}

export type FarmChartSelectorActions =
    | { type: FarmChartSelectorActionTypes.FETCH_SUCCESS; payload: any }
    | { type: FarmChartSelectorActionTypes.FETCH_REQUEST }
    | { type: FarmChartSelectorActionTypes.FETCH_ERROR; message: any }
    | { type: FarmChartSelectorActionTypes.SELECTED };

export interface FarmChartSelectorState {
    data: any;
    loading: boolean;
    error?: string;
}
const initialState: FarmChartSelectorState = {
    data: [],
    loading: false,
    error: undefined
};

const FarmChartSelectorReducer: Reducer<FarmChartSelectorState, any> = (
    state = initialState,
    action: FarmChartSelectorActions
) => {
    switch (action.type) {
        case FarmChartSelectorActionTypes.FETCH_REQUEST:
            return { ...state, loading: true };
        case FarmChartSelectorActionTypes.FETCH_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FarmChartSelectorActionTypes.FETCH_ERROR:
            return { ...state, loading: false, error: action.message };

        default:
            return state;
    }
};

export default FarmChartSelectorReducer;
