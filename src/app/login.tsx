import { Redirect } from 'expo-router';
import { Dumbbell, Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/useAuth';
import { cores, fontes } from '@/theme';

export default function LoginScreen() {
  const { token, login, recuperarSenha } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }

    setCarregando(true);
    try {
      await login(email, senha);
    } catch {
      Alert.alert('Erro', 'E-mail ou senha inválidos.');
    } finally {
      setCarregando(false);
    }
  }

  async function esqueciSenha() {
    if (!email) {
      Alert.alert('Atenção', 'Digite seu e-mail para recuperar a senha.');
      return;
    }

    try {
      await recuperarSenha(email);
      Alert.alert('E-mail enviado', 'Verifique sua caixa de entrada para redefinir a senha.');
    } catch {
      Alert.alert('Erro', 'Não foi possível enviar o e-mail. Confira o endereço digitado.');
    }
  }

  if (token) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <SafeAreaView style={styles.tela}>
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <View style={styles.logoCaixa}>
          <Dumbbell size={36} color={cores.destaque} />
        </View>

        <Text style={styles.marca}>
          ARENA <Text style={styles.marcaDestaque}>CHECK-IN</Text>
        </Text>
        <Text style={styles.subtitulo}>Sua presença garantida na evolução</Text>

        <Text style={[styles.label, styles.labelEmail]}>EMAIL</Text>
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

        <Text style={[styles.label, styles.labelSenha]}>SENHA</Text>
        <View style={styles.campo}>
          <Lock size={20} color={cores.textoSecundario} />
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor={cores.textoSecundario}
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            {mostrarSenha ? (
              <Eye size={20} color={cores.textoSecundario} />
            ) : (
              <EyeOff size={20} color={cores.textoSecundario} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botao} onPress={entrar} disabled={carregando}>
          <Text style={styles.botaoTexto}>{carregando ? 'Entrando...' : 'Entrar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.esqueciBotao} onPress={esqueciSenha}>
          <Text style={styles.esqueciTexto}>Esqueceu a senha?</Text>
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
  logoCaixa: {
    width: 60,
    height: 60,
    marginTop: 70,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.destaqueSuave,
  },
  marca: {
    marginTop: 12,
    fontFamily: fontes.outfitBlack,
    fontSize: 32,
    textAlign: 'center',
    color: cores.texto,
  },
  marcaDestaque: {
    color: cores.destaque,
  },
  subtitulo: {
    marginTop: 12,
    fontFamily: fontes.geistRegular,
    fontSize: 15,
    textAlign: 'center',
    color: cores.textoSecundario,
  },
  label: {
    marginBottom: 8,
    fontFamily: fontes.geistSemiBold,
    fontSize: 13,
    letterSpacing: 1,
    color: cores.textoSecundario,
  },
  labelEmail: {
    marginTop: 112,
  },
  labelSenha: {
    marginTop: 20,
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
  esqueciBotao: {
    marginTop: 20,
    paddingTop: 8,
    alignSelf: 'center',
  },
  esqueciTexto: {
    fontFamily: fontes.geistMedium,
    fontSize: 14,
    textDecorationLine: 'underline',
    color: cores.textoSecundario,
  },
});
