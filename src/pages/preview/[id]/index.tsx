import Head from 'next/head';
import { useRouter } from 'next/router';

import { Preview } from '@/components/Preview';

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
