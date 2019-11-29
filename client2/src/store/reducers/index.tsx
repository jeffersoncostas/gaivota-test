import { combineReducers } from 'redux';
import credential from './Credential';
import farmChatSelector from './FarmChartSelector';
import farms from './Farms';
import farmChartData from './FarmChartsData';
import uploadCsv from './UploadCsv';

const rootReducer = combineReducers({
    credential,
    farmChatSelector,
    farms,
    farmChartData,
    uploadCsv
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
