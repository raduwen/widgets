import { useState } from 'react';
import Head from 'next/head';

import TextWidget from '@/components/TextWidget';
import TimeWidget from '@/components/TimeWidget';

const IndexPage = () => {
  const text = `オレオレOBSウィジュエットの整理`;
  return (
    <div>
      <TextWidget text={text} />
      <TimeWidget size={30} />
    </div>
  );
};

export default IndexPage;
