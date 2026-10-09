import { Redirect } from 'expo-router';
import { LogOut } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/useAuth';
import { useFirestore } from '@/hooks/useFirestore';
import { cores, fontes } from '@/theme';

export default function DashboardScreen() {
  const { user, token, logout } = useAuth();
  const { treino, carregando } = useFirestore();

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

      <Text style={styles.saudacao}>Olá, {user?.displayName ?? 'atleta'}!</Text>

      <View style={styles.subtituloLinha}>
        <View style={styles.ponto} />
        <Text style={styles.subtitulo}>
          {carregando && 'Carregando treino...'}
          {!carregando && treino && `Seu treino de hoje • Foco em ${treino.foco}`}
          {!carregando && !treino && 'Hoje é dia de descanso'}
        </Text>
      </View>
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
});
