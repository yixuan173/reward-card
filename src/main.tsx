import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from '@pages/index';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <Router basename="/reward-card">
        <App />
      </Router>
    </ChakraProvider>
  </StrictMode>,
);
