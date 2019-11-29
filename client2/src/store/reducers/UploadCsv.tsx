import { Reducer } from 'redux';

export enum UploadCsvActionTypes {
    SUCCESS = '@@farmChartSelector/FETCH_SUCCESS',
    ERROR = '@@farmChartSelector/FETCH_ERROR'
}

export type UploadCsvActions =
    | { type: UploadCsvActionTypes.SUCCESS; payload: any }
    | { type: UploadCsvActionTypes.ERROR; message: any };

export interface UploadCsv {
    data: any;
    loading: boolean;
    error?: string;
}
const initialState: UploadCsv = {
    data: undefined,
    loading: false,
    error: undefined
};

const UploadCsvReducer: Reducer<UploadCsv, any> = (
    state = initialState,
    action: UploadCsvActions
) => {
    switch (action.type) {
        case UploadCsvActionTypes.SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case UploadCsvActionTypes.ERROR:
            return { ...state, loading: false, error: action.message };

        default:
            return state;
    }
};

export default UploadCsvReducer;
