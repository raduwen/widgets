import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ref, onValue, DataSnapshot } from '@firebase/database';

import { db } from '@/lib/firebase';
import { PreviewMap } from '@/components/widgets';

type Widget = {
  name: string;
  props: any;
}

type WidgetList = { [key: string]: Widget }

type PreviewProps = {
  profile: string;
}

const Preview = ({ profile }: PreviewProps) => {
  const [widgets, setWidgets] = useState<WidgetList>({});

  useEffect(() => {
    const widgetsRef = ref(db, `/profiles/${profile}/widgets`);
    onValue(widgetsRef, (snap: DataSnapshot) => {
      if (snap?.val()) {
        setWidgets(snap.val());
      }
    });
  }, [profile]);

  return (
    <div>
      {
        Object.keys(widgets).map((id) => {
          const widget: any = widgets[id];
          const Widget = PreviewMap[widget.name];
          if (Widget)
            return <Widget key={id} {...widget.props} />;
          else
            return null;
        })
      }
    </div>
  );
};

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
