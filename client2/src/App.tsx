import React from 'react';
import RootRouting from './routes';

import { GlobalStyle } from './styled';
import Header from './components/Header';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => {
    // const { location, match } = useRouteMatch();

    return (
        <>
            <GlobalStyle />
            <Provider store={store}>
                <Header />
                <RootRouting />
            </Provider>
        </>
    );
};

export default App;
