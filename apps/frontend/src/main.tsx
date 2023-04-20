import { StrictMode } from 'react';

import { ApolloProvider } from '@apollo/client';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { client } from './clientApollo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
