import { Redirect } from 'expo-router';
import { LogOut } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/useAuth';
import { cores, fontes } from '@/theme';

export default function DashboardScreen() {
  const { user, token, logout } = useAuth();

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
});
