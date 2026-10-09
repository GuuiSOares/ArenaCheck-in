import { useRouter } from 'expo-router';
import { ArrowLeft, Lock, Mail, User } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/useAuth';
import { cores, fontes } from '@/theme';

export default function CadastroScreen() {
  const router = useRouter();
  const { cadastrar } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function criarConta() {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    setCarregando(true);
    try {
      await cadastrar(nome, email, senha);
      Alert.alert('Conta criada', 'Agora é só entrar com seu e-mail e senha.');
      router.back();
    } catch {
      Alert.alert('Erro', 'Não foi possível criar a conta. Verifique se o e-mail é válido e ainda não foi cadastrado.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.tela}>
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.voltar} onPress={() => router.back()}>
          <ArrowLeft size={20} color={cores.texto} />
        </TouchableOpacity>

        <Text style={styles.titulo}>Criar conta</Text>
        <Text style={styles.subtitulo}>Cadastre-se para registrar sua presença nos treinos</Text>

        <Text style={[styles.label, styles.primeiroLabel]}>NOME</Text>
        <View style={styles.campo}>
          <User size={20} color={cores.textoSecundario} />
          <TextInput
            style={styles.input}
            placeholder="Seu nome"
            placeholderTextColor={cores.textoSecundario}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <Text style={styles.label}>EMAIL</Text>
        <View style={styles.campo}>
          <Mail size={20} color={cores.textoSecundario} />
          <TextInput
            style={styles.input}
            placeholder="exemplo@email.com"
            placeholderTextColor={cores.textoSecundario}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text style={styles.label}>SENHA</Text>
        <View style={styles.campo}>
          <Lock size={20} color={cores.textoSecundario} />
          <TextInput
            style={styles.input}
            placeholder="Mínimo de 6 caracteres"
            placeholderTextColor={cores.textoSecundario}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity style={styles.botao} onPress={criarConta} disabled={carregando}>
          <Text style={styles.botaoTexto}>{carregando ? 'Cadastrando...' : 'Cadastrar'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  voltar: {
    width: 40,
    height: 40,
    marginTop: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.card,
  },
  titulo: {
    marginTop: 24,
    fontFamily: fontes.outfitExtraBold,
    fontSize: 28,
    color: cores.texto,
  },
  subtitulo: {
    marginTop: 4,
    fontFamily: fontes.geistRegular,
    fontSize: 15,
    color: cores.textoSecundario,
  },
  label: {
    marginTop: 20,
    marginBottom: 8,
    fontFamily: fontes.geistSemiBold,
    fontSize: 13,
    letterSpacing: 1,
    color: cores.textoSecundario,
  },
  primeiroLabel: {
    marginTop: 48,
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: cores.borda,
    backgroundColor: cores.card,
  },
  input: {
    flex: 1,
    fontFamily: fontes.geistRegular,
    fontSize: 15,
    color: cores.texto,
  },
  botao: {
    height: 56,
    marginTop: 48,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.destaque,
  },
  botaoTexto: {
    fontFamily: fontes.outfitBold,
    fontSize: 16,
    color: cores.texto,
  },
});
