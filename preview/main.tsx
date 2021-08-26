import React from 'react';
import { render } from 'react-dom';

import '@/global.css';
import { PreviewApp } from '@/components/PreviewApp';

render(
  <React.StrictMode>
    <PreviewApp />
  </React.StrictMode>,
  document.getElementById('root')
);
