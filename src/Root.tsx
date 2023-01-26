import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import { activateRDV } from '@/config'

// uncomment to use
// import 'react-devtools'

function RDVLoader(activateRDV: any) {
  switch (activateRDV) {
    case true:
      console.log('react-devtools loaded');
      return import('react-devtools');
  
    case false:
      return console.log('react-devtools not loaded; toggle activateRDV in config ');
  }
}
RDVLoader(activateRDV)

import ThemeProvider from '@/theme/Provider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <RecoilRoot>
        <HelmetProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </HelmetProvider>
      </RecoilRoot>
    </StrictMode>,
  );
}

export default render;
