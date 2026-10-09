import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '@/config/firebase';

export type Exercicio = {
  nome: string;
  series: number;
  repeticoes: number;
  carga: string;
};

export type Treino = {
  foco: string;
  exercicios: Exercicio[];
};

const diasDaSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

export function useFirestore() {
  const [treino, setTreino] = useState<Treino | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarTreinoDoDia() {
      try {
        const hoje = diasDaSemana[new Date().getDay()];
        const documento = await getDoc(doc(db, 'treinos', hoje));
        setTreino(documento.exists() ? (documento.data() as Treino) : null);
      } catch {
        setTreino(null);
      } finally {
        setCarregando(false);
      }
    }

    buscarTreinoDoDia();
  }, []);

  async function registrarPresenca(uid: string) {
    await addDoc(collection(db, 'checkins'), {
      uid,
      data: serverTimestamp(),
    });
  }

  return { treino, carregando, registrarPresenca };
}
