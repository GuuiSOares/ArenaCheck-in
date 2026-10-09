import { Redirect } from 'expo-router';
import { Check, Fingerprint, LogOut } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/useAuth';
import { useFirestore } from '@/hooks/useFirestore';
import { cores, fontes } from '@/theme';

export default function DashboardScreen() {
  const { user, token, logout } = useAuth();
  const { treino, carregando, registrarPresenca } = useFirestore();
  const [registrando, setRegistrando] = useState(false);
  const [presencaRegistrada, setPresencaRegistrada] = useState(false);

  async function registrar() {
    if (!user) {
      return;
    }

    setRegistrando(true);
    try {
      await registrarPresenca(user.uid);
      setPresencaRegistrada(true);
      Alert.alert('Presença registrada', 'Bom treino!');
    } catch {
      Alert.alert('Erro', 'Não foi possível registrar a presença. Tente novamente.');
    } finally {
      setRegistrando(false);
    }
  }

  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView style={styles.tela}>
      <View style={styles.cabecalho}>
        <TouchableOpacity style={styles.botaoSair} onPress={logout}>
          <LogOut size={20} color={cores.texto} />
        </TouchableOpacity>
        <Text style={styles.cabecalhoTitulo}>Dashboard</Text>
        <View style={styles.espacoCabecalho} />
      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.saudacao}>Olá, {user?.displayName ?? 'atleta'}!</Text>

        <View style={styles.subtituloLinha}>
          <View style={styles.ponto} />
          <Text style={styles.subtitulo}>
            {carregando && 'Carregando treino...'}
            {!carregando && treino && `Seu treino de hoje • Foco em ${treino.foco}`}
            {!carregando && !treino && 'Hoje é dia de descanso'}
          </Text>
        </View>

        <View style={styles.lista}>
          {treino?.exercicios.map((exercicio) => (
            <View key={exercicio.nome} style={styles.card}>
              <View style={styles.cardBarra} />
              <View style={styles.cardTextos}>
                <Text style={styles.cardTitulo}>{exercicio.nome}</Text>
                <Text style={styles.cardDescricao}>
                  {exercicio.series} séries x {exercicio.repeticoes} repetições • {exercicio.carga}
                </Text>
              </View>
              <View style={styles.cardCheck}>
                <Check size={14} strokeWidth={3} color={cores.destaque} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.botaoPresenca, presencaRegistrada && styles.botaoPresencaRegistrada]}
        onPress={registrar}
        disabled={registrando || presencaRegistrada}
      >
        <Fingerprint size={20} color={cores.texto} />
        <Text style={styles.botaoPresencaTexto}>
          {presencaRegistrada ? 'Presença registrada' : 'Registrar Presença'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: cores.fundo,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  botaoSair: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.card,
  },
  cabecalhoTitulo: {
    fontFamily: fontes.outfitBold,
    fontSize: 18,
    color: cores.texto,
  },
  espacoCabecalho: {
    width: 40,
  },
  conteudo: {
    paddingBottom: 24,
  },
  saudacao: {
    marginTop: 20,
    fontFamily: fontes.outfitExtraBold,
    fontSize: 28,
    color: cores.texto,
  },
  subtituloLinha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 4,
  },
  ponto: {
    width: 6,
    height: 6,
    marginTop: 7,
    borderRadius: 3,
    backgroundColor: cores.destaque,
  },
  subtitulo: {
    flex: 1,
    fontFamily: fontes.geistRegular,
    fontSize: 15,
    color: cores.textoSecundario,
  },
  lista: {
    gap: 12,
    marginTop: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 18,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: cores.borda,
    backgroundColor: cores.card,
  },
  cardBarra: {
    width: 4,
    alignSelf: 'stretch',
    borderRadius: 2,
    backgroundColor: cores.destaque,
  },
  cardTextos: {
    flex: 1,
  },
  cardTitulo: {
    fontFamily: fontes.outfitSemiBold,
    fontSize: 18,
    color: cores.texto,
  },
  cardDescricao: {
    marginTop: 4,
    fontFamily: fontes.geistRegular,
    fontSize: 14,
    color: cores.textoSecundario,
  },
  cardCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.destaqueSuave,
  },
  botaoPresenca: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: cores.destaque,
  },
  botaoPresencaRegistrada: {
    opacity: 0.5,
  },
  botaoPresencaTexto: {
    fontFamily: fontes.outfitBold,
    fontSize: 16,
    color: cores.texto,
  },
});
