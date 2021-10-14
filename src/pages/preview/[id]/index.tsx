import Head from 'next/head';
import { useRouter } from 'next/router';

import { TextWidget } from '@/components/TextWidget';
import { TimeWidget } from '@/components/TimeWidget';
import { IFrameWidget } from '@/components/IFrameWidget';
import { Preview } from '@/components/Preview';

const Widgets = {
  'text': TextWidget,
  'time': TimeWidget,
  'iframe': IFrameWidget,
};

type Widget = {
  name: string;
  props: any;
}

type WidgetList = { [key: string]: Widget }

const PreviewPage = () => {
  const router = useRouter();
  const profile = router.query.id as string;

  return (
    <>
      <Head>
        <title>{profile} - Raduwen OBS Widgets</title>
      </Head>
      <Preview profile={profile} />
    </>
  );
};

export default PreviewPage;
