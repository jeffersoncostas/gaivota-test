import React from 'react';
import RootRouting from './routes';

import { GlobalStyle } from './styled';


const App: React.FC = () => {
  // const { location, match } = useRouteMatch();

  return (

    <>
      <GlobalStyle />
      <RootRouting />
    </>
  );
}

export default App;
