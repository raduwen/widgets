import React from 'react';
import { render } from 'react-dom';

import '@/global.css';
import { AdminApp } from '@/components/AdminApp';

render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>,
  document.getElementById('root')
);
