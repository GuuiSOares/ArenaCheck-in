import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '@/config/firebase';

export function useFeatureToggle(nomeDaFlag: string) {
  const [ativa, setAtiva] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'config', 'app'),
      (documento) => setAtiva(documento.data()?.[nomeDaFlag] === true),
      () => setAtiva(false),
    );

    return unsubscribe;
  }, [nomeDaFlag]);

  return ativa;
}
