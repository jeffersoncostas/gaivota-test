import { Reducer } from 'redux';

export enum FarmsActionTypes {
    FETCH_REQUEST = '@@farms/FETCH_REQUEST',
    FETCH_SUCCESS = '@@farms/FETCH_SUCCESS',
    FETCH_ERROR = '@@farms/FETCH_ERROR',
    SELECTED = '@@farms/SELECTED'
}

export type FarmsActions =
    | { type: FarmsActionTypes.FETCH_SUCCESS; payload: any }
    | { type: FarmsActionTypes.FETCH_REQUEST }
    | { type: FarmsActionTypes.FETCH_ERROR; message: any }
    | { type: FarmsActionTypes.SELECTED; payload: any };

export interface FarmsState {
    data: any;
    loading: boolean;
    error?: string;
    farmSelected: {
        name?: string;
        culture?: string;
        variety?: string;
        total_area: number;
        yield_estimation: number;
        farm_id: string;
        price?: number;
        geoJson?: any;
        latitude: number;
        longitude: number;
    };
}
export const initialState: FarmsState = {
    data: [],
    loading: false,
    error: undefined,
    farmSelected: {
        farm_id: '31x',
        latitude: -4.9716608,
        longitude: -39.0169016,
        yield_estimation: 10,
        total_area: 1
    }
};

const FarmsReducer: Reducer<FarmsState, any> = (
    state = initialState,
    action: FarmsActions
) => {
    switch (action.type) {
        case FarmsActionTypes.FETCH_REQUEST:
            return { ...state, loading: true };
        case FarmsActionTypes.FETCH_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FarmsActionTypes.FETCH_ERROR:
            return { ...state, loading: false, error: action.message };
        case FarmsActionTypes.SELECTED:
            return { ...state, farmSelected: action.payload };

        default:
            return state;
    }
};

export default FarmsReducer;
