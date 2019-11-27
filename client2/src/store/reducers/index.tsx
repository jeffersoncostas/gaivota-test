import { combineReducers } from 'redux';
import credential from './Credential';
import farmChatSelector from './FarmChartSelector';
import farms from './Farms';
import farmChartData from './FarmChartsData';

const rootReducer = combineReducers({
    credential,
    farmChatSelector,
    farms,
    farmChartData
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
