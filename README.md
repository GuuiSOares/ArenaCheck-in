# ArenaCheck-in

Aplicativo mobile de **controle de treinos e presença** para alunos de academias e estúdios esportivos (musculação, boxe etc.). O aluno entra com sua conta, consulta o treino do dia e registra sua presença na academia.

## Equipe TriCode

| Nome | RM |
|---|---|
| Guilherme Soares de Almeida | RM563143 |
| Lucas Silva Gastão Pinheiro | RM563960 |
| Geovanne Coneglian Passos | RM562673 |

## Público-alvo

Alunos de academias e estúdios esportivos (musculação, boxe etc.).

## Funcionalidades

- **Login** com e-mail e senha via Firebase Authentication
- **Cadastro** de novos alunos e **recuperação de senha** por e-mail
- **Roteamento automático**: se existe uma sessão válida (JWT), o app abre direto no Dashboard
- **Treino do dia**: leitura no Firestore da ficha de treino correspondente ao dia da semana
- **Registrar Presença**: grava um check-in na coleção `checkins` do Firestore
- **Feature toggle**: um banner de evento da academia aparece ou some em tempo real, controlado pela flag `exibir_banner_evento` no Firebase, sem precisar atualizar o app

## Telas

- **Login**: autenticação com e-mail e senha, link para cadastro e recuperação de senha
- **Cadastro**: criação de conta com nome, e-mail e senha
- **Dashboard**: saudação, treino do dia em cards, banner de evento e botão "Registrar Presença"

## Arquitetura

Toda a arquitetura usa somente o **Firebase** (Authentication e Cloud Firestore).

- **Context API** (`AuthContext`): estado global da sessão (usuário, token, login, logout, cadastro e recuperação de senha)
- **Custom Hooks**:
  - `useAuth`: acesso ao contexto de autenticação
  - `useFirestore`: busca o treino do dia e registra a presença
  - `useFeatureToggle`: escuta em tempo real as flags de interface
- **Segurança**: o JWT do usuário é extraído com `getIdToken()` e salvo de forma criptografada no dispositivo com `expo-secure-store`. Ele é atualizado automaticamente sempre que o Firebase renova o token. No Firestore, regras de segurança permitem que apenas usuários autenticados leiam os treinos e criem check-ins em seu próprio nome.

> **Feature adicional:** o feature toggle foi implementado com um documento do Firestore lido em tempo real (`onSnapshot`), pois o SDK do Firebase Remote Config não é suportado no Expo Go.

## Estrutura do projeto

```
src/
  app/
    _layout.tsx        Carrega as fontes e envolve o app com o AuthProvider
    index.tsx          Decide a rota inicial (Login ou Dashboard) a partir do JWT
    login.tsx          Tela de Login
    cadastro.tsx       Tela de Cadastro
    dashboard.tsx      Tela do Dashboard
  config/
    firebase.ts        Conexão com o Firebase (Auth e Firestore)
  context/
    AuthContext.tsx    Estado global da sessão
  hooks/
    useAuth.ts
    useFirestore.ts
    useFeatureToggle.ts
  theme.ts             Cores e fontes do app
```

## Estrutura do Firestore

| Coleção | Documento | Campos |
|---|---|---|
| `treinos` | `domingo`, `segunda`, `terca`, `quarta`, `quinta`, `sexta`, `sabado` | `foco` (string), `exercicios` (array de `{ nome, series, repeticoes, carga }`) |
| `checkins` | gerado automaticamente | `uid` (string), `data` (timestamp) |
| `config` | `app` | `exibir_banner_evento` (boolean) |

## Tecnologias

- React Native com Expo e Expo Router
- TypeScript
- Firebase Authentication e Cloud Firestore
- expo-secure-store
- lucide-react-native (ícones) e fontes Outfit e Geist

## Como executar

Pré-requisitos: Node.js e o app **Expo Go** instalado no celular (ou um emulador Android).

```bash
git clone https://github.com/GuuiSOares/ArenaCheck-in.git
cd ArenaCheck-in
npm install
npx expo start
```

Depois, leia o QR Code com o Expo Go (ou pressione `a` para abrir no emulador Android). Para entrar, crie uma conta pela tela de cadastro.
