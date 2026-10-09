import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@/hooks/useAuth';
import { cores } from '@/theme';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
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

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        ARENA <Text style={styles.logoDestaque}>CHECK-IN</Text>
      </Text>
      <Text style={styles.subtitulo}>Sua presença garantida na evolução</Text>

      <Text style={styles.label}>EMAIL</Text>
      <TextInput
        style={styles.input}
        placeholder="exemplo@email.com"
        placeholderTextColor={cores.textoSecundario}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>SENHA</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor={cores.textoSecundario}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={entrar} disabled={carregando}>
        <Text style={styles.botaoTexto}>{carregando ? 'Entrando...' : 'Entrar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: cores.fundo,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: cores.texto,
  },
  logoDestaque: {
    color: cores.destaque,
  },
  subtitulo: {
    marginTop: 8,
    marginBottom: 48,
    textAlign: 'center',
    color: cores.textoSecundario,
  },
  label: {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: cores.textoSecundario,
  },
  input: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: cores.borda,
    backgroundColor: cores.card,
    color: cores.texto,
  },
  botao: {
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: cores.destaque,
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.texto,
  },
});
