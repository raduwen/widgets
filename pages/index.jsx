import { useState } from 'react';
import Head from 'next/head';

import TimeWidget from '../components/TimeWidget'

const IndexPage = () => {
  return (
    <div>
      <TimeWidget size={30} />
    </div>
  );
};

export default IndexPage;
